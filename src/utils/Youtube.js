class Youtube {

  constructor() {
    this.player = null;
    this.subscriptions = {
      onReady: [(event) => this.player = event.target],
      onStateChange: []
    };
    
    window['onYouTubeIframeAPIReady'] = () => {
      this.getNewPlayer()
    };

    if (this.player == null) {
      const tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      // tag.src = "https://www.youtube.com/iframe_api";
      const [firstScriptTag] = document.getElementsByTagName('script');
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  addEventListener(eventName, callback) {
    if (eventName in this.subscriptions !== true) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
  }

  destroyPlayer() {
    this.player.destroy();
  }

  getNewPlayer() {
    if (window.YT != null) {
      this.player = new window.YT.Player('player', {
        height: '390',
        events: {
          onReady: (event) => 
            this.subscriptions['onReady'].map(callback => callback(event)),
          onStateChange: (event) =>
            this.subscriptions['onStateChange'].map(callback => callback(event)),
        },
        playerVars: { 'autoplay': 1, 'controls': 0 },
        width: '640',
      });
    }
  }

  getPlayer() {
    return this.player;
  }

  removeEventListener(eventName, callback) {
    if (eventName in this.subscriptions) {
      this.subscriptions[eventName] =
        this.subscriptions[eventName].filter(listener => listener !== callback);
    }
  }
}

export default new Youtube();
