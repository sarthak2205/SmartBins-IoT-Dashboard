const mqtt = require('mqtt')

const topic = '/Smartbin';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'user1',
    password: 'pass1',
    reconnectPeriod: 1000,
  })

const mqttconnection = client.on('connect', function () {
  client.subscribe('/Firesystem')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
  })

module.exports = mqttconnection