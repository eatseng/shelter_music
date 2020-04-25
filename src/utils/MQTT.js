import mqtt from 'mqtt';

class MQTT {

  addEventListener(topic, callback) {
    if (topic in this.subscriptions !== true) {
      this.subscriptions[topic] = [];
    }
    this.subscriptions[topic].push(callback);

    this.client != null && this.client.subscribe(topic);
  }

  cleanUp() {
    this.client.end();
    this.subscriptions = {}
  }

  init() {
    this.subscriptions = {}
    
    this.client = mqtt.connect(
      `${process.env.REACT_APP_MTQQ_URL}:9001`,
    );
   
    this.client.on(
      'message',
      (topic, message) => {
        (this.subscriptions[topic] || [])
          .map(callback => callback(JSON.parse(message)));
      },
    );
  }

  removeEventListener(topic, callback) {
    if (topic in this.subscriptions) {
      this.subscriptions[topic] =
        this.subscriptions[topic]
          .filter(listener => listener !== callback);
    }

    this.client.unsubscribe(topic);
  }
}

export default new MQTT();
