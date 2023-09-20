#include <ESP8266WiFi.h>
#include <PubSubClient.h>

//For Sensor 1
#define trigger_pin 12
#define Echo_pin 14
#define LED 2

//For Sensor 2
#define trigger_pin_2 16
#define Echo_pin_2 5 

const char *ssid = "AndroidAP_9677";
const char *pwd = "anal@123";

//MQTT Settings
const char *host = "192.168.118.28";  //For mobile Hotspot, the ip address is your ipv4 address 192.168.29.16, , 172.20.10.3
const int mqttport = 1883;
const char *Username = "user1";
const char *Password = "pass1";
const char *topic = "/Smartbin";

WiFiClient client;
PubSubClient mqttClient(client);

/* two variables to store duraion and distance value for sensor 1*/
long duration; 
int distance;

// Variables for sensor 2
long duration_2; 
int distance_2;

//Other variables
int retries = 0;
int status = WL_IDLE_STATUS;
unsigned long lastSend;


bool status_1=0;
bool status_2=0;

void publishData();
void trigger();

void setup() 
{
  pinMode(trigger_pin, OUTPUT); 
  pinMode(LED, OUTPUT); 
  pinMode(Echo_pin, INPUT);

  //Sensor 2 configuration
  pinMode(trigger_pin_2, OUTPUT); 
  pinMode(Echo_pin_2, INPUT); 
  Serial.begin(9600); 
  connectToWiFi();
  lastSend = 0;
  mqttClient.setServer(host, mqttport);
}


void loop() 
{
  while(WiFi.status() == WL_CONNECTED) 
  {
    if(millis()-lastSend > 1000) 
    {
      trigger();
      lastSend = millis();
    }
    mqttClient.loop();
  }
  Serial.println(WiFi.status());
}


void connectToWiFi() 
{
  //Connect to WiFi Network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to WiFi");
  Serial.println("...");
  WiFi.begin(ssid, pwd);
  int retries = 0;
  while ((WiFi.status() != WL_CONNECTED) && (retries < 15)) 
  {
    retries++;
    delay(1000);
    Serial.print(".");
  }
  if (retries > 14) 
  {
    Serial.println(F("WiFi connection FAILED"));
    delay(5000);
    Serial.println(F("Trying again"));
    connectToWiFi();
  }
  if (WiFi.status() == WL_CONNECTED) 
  {
    Serial.println(F("WiFi connected!"));
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }
}


void trigger() 
{
  digitalWrite(trigger_pin, LOW); //set trigger signal low for 2us
  digitalWrite(trigger_pin_2, LOW);  //set trigger signal low for 2us for sensor 2
  delayMicroseconds(2);

  /*send 10 microsecond pulse to trigger pin of HC-SR04 */
  digitalWrite(trigger_pin, HIGH);  // make trigger pin for sesnor 1 active high
  delayMicroseconds(10);            // wait for 10 microseconds
  digitalWrite(trigger_pin, LOW);   // make trigger pin sesnor 1 active low

  duration = pulseIn(Echo_pin, HIGH); // save time duration value in "duration variable for sensor 1

  delay(100);

  //Sensor 2:
  digitalWrite(trigger_pin_2, HIGH);  // make trigger pin sesnor 2 active high
  delayMicroseconds(10);            // wait for 10 microseconds
  digitalWrite(trigger_pin_2, LOW);   // make trigger pin sesnor 2 active low

  /*Measure the Echo output signal duration or pulss width */
  duration_2 = pulseIn(Echo_pin_2, HIGH); // save time duration value in "duration_2 variable for Sensor 2 

  distance= duration*0.034/2; //Convert pulse duration into distance
  distance_2 = duration_2*0.034/2; //Convert pulse duration into distance for sensor 2

  status_1 = 0;
  status_2 = 0;
  /* if distance greater than 10cm, turn on LED */

  if ( distance <= 10) 
  {
    status_1 = 1;
  }

  if (distance_2 <= 10) 
  {
    status_2 = 1;
  }
  
  String message = String("070d01c4-44d7-4a4c-aa6a-2a90188cc758") + "," + String(status_1) + "," + String(status_2);   //I want the message to be 123,1,0

  // print measured distance value on Arduino serial monitor
  Serial.print("Distance of sensor 1: ");
  Serial.print(distance);
  Serial.println(" cm");

  //Sensor 2 distance measurement:
  Serial.print("Distance of sensor 2: ");
  Serial.print(distance_2);
  Serial.println(" cm");
  publishData(message.c_str());
  delay(10000);

}


//Publishing data code: 
void publishData(const char *message) 
{
  Serial.print("Attempting to connect to the: ");
  Serial.println(host);
  //tb.connect(host, Token, port, clientID, password)
  if (!mqttClient.connected()) 
  {
    Serial.println("Connecting to MQTT broker...");
  
    if (mqttClient.connect("0", "user1", "pass1")) 
    {
      Serial.println("Connected to MQTT broker!");
    } else {
      Serial.println("Failed to connect to MQTT broker");
      return; // Exit the function if the connection failed
    }
  }

  bool success = mqttClient.publish(topic, message);
  if (success){
    Serial.println("Message sent successfully");
  } 
  else {
    Serial.println("Failed to connect to MQTT broker");
  }
  delay(1000);
}