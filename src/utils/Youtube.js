class Youtube {

  constructor () {
    this.callbacks = {default: (event) => this.player = event.target};
    this.player = null;
    
    window['onYouTubeIframeAPIReady'] = () => {
      this.getNewPlayer()
    };

    if (this.player == null) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const [firstScriptTag] = document.getElementsByTagName('script');
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  destroyPlayer () {
    this.player.destroy();
  }

  getNewPlayer() {
    if (window.YT != null) {
      this.player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        events: {
          onReady: (event) => 
            Object.values(this.callbacks).map(callback => callback(event)),
        },
      });
    }
  }

  getPlayer() {    
    if (this.player == null) {
      this.getNewPlayer();
    }

    return this.player;
  }

  listener (event) {
    Object.values(this.callbacks).map(callback => callback(event));
  }

  removeCallback(id) {
    delete this.callbacks[id];
  }

  setCallback(id, callback) {
    if (id in this.callbacks !== true) {
      this.callbacks[id] = callback;
    }
  }
}

export default new Youtube();
