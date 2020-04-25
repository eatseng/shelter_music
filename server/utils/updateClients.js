const mqtt = require('mqtt');

const updateClients = module.exports = (subTopic, tag) => {
  const client = mqtt.connect(
    process.env.REACT_APP_MTQQ_URL,
    {
      connectTimeout:1000,
      username: process.env.MTQQ_BROADCAST,
      password: process.env.MTQQ_BROADCAST_PW,
    },
  );
  client.on('connect', () => {
    client.publish(
      `${process.env.REACT_APP_MTQQ_TOPIC_HEADER}/${subTopic}`,
      tag != null
        ? JSON.stringify({timestamp: Math.floor(Date.now() / 1000), tag})
        : JSON.stringify({timestamp: Math.floor(Date.now() / 1000)}),
    );
    client.end();
  });
}