var mqtt = require('mqtt')
var client  = mqtt.connect(
	'mqtt://3.22.206.48',
  {
    connectTimeout:1000, 
    username: 'sheltermusicbroadcaster',
    password: 'shelter_music_broadcaster_13!',
  },
)

const topic = 'sheltermusic/121';
 
client.on('connect', function () {
  console.log('Connected')
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topic, 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
