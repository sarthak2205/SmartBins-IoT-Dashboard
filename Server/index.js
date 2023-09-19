const express = require("express");
const form = require("./form/device");
const driver = require("./form/driver");
const reports = require("./reports/waste");
const auth = require('./auth/signin');
const cors = require('cors');
const db = require("./db")

const mqtt = require('mqtt');
const protocol = 'mqtt://'
const host = "172.20.10.3" // for home WiFi 192.168.29.16
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json())

const connectUrl = `${protocol}://${host}:${port}`


//Mqtt Code Start
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'user1',
    password: 'pass1',
    reconnectPeriod: 1000,
  })

client.on('connect', function () {
  client.subscribe('/Smartbin')
})

client.on('message', function (topic, message) {
    // message is Buffer
    const data = message.toString();
    const [deviceId, sensor1Data, sensor2Data] = data.split(',');
    console.log("Message sent to server is: ", data)
    console.log("Device ID: ",deviceId);
    console.log("Sensor 1: ", sensor1Data);
    console.log("Sensor 2: ", sensor2Data);
    processSensorData(deviceId, sensor1Data, sensor2Data);
  })
//Mqtt Code End

function processSensorData(deviceId, sensor1Data, sensor2Data) {
    // Process Sensor 1 and Sensor 2 data
    // Calculate status based on the values
    const status = (sensor1Data == '1' && sensor2Data == '1' ? '1' : '0');
    console.log("Status: ", status)
    insertDataToDatabase(deviceId, sensor1Data, sensor2Data, status);
  }

function insertDataToDatabase(deviceId, sensor1Data, sensor2Data, status) {

    const query = 'UPDATE `bindetails` SET `Sensor 1` = ?, `Sensor 2` = ?, `Status` = ?, `Updated` = NOW() WHERE `Device ID` = ?';
    db.query(query, [sensor1Data, sensor2Data, status, deviceId], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return;
      }
      console.log('Data inserted into the database:', results);
    });
}

app.use("/driver", driver);
app.use("/auth", auth);
app.use("/form", form)
app.use("/reports", reports)
app.listen(PORT, () => console.log("Server running on port", PORT))