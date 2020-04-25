import Youtube from './Youtube';

class OmniPlayer {

  addEventListener(eventName, callback) {
    if (eventName in this.subscriptions !== true) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
  }

  cleanUp() {
    this.playlist = [];
    this.subscriptions = {}
    this.player = null;
    Youtube.removeEventListener('onReady', this.onPlayerReady);
    Youtube.removeEventListener('onStateChange', this.onPlayerStateChange);
    Youtube.destroyPlayer();
  }

  init() {
    this.playlist = [];
    this.subscriptions = {}
    this.player = null;
    Youtube.addEventListener('onReady', this.onPlayerReady);
    Youtube.addEventListener('onStateChange', this.onPlayerStateChange);
    Youtube.getNewPlayer();
  }

  onPlayerReady = (event) => {
    this.player = event.target;
    (this.subscriptions['onReady'] || []).map(callback => callback(event));

    this.play();
  }

  onPlayerStateChange = (event) => {
    (this.subscriptions['onStateChange'] || []).map(callback => callback(event));
  }

  play() {
    const [currentVideo] = this.playlist;
    currentVideo && this.playVideo(currentVideo);
  }

  playVideo(video) {
    this.player &&
      this.player.loadPlaylist(video.videoID, 0 /* seek position */);
  }

  setPlaylist(playlist) {
    const [firstVideo] = playlist;
    const [currentVideo] = this.playlist;
    
    if (firstVideo?.id != null && firstVideo?.id !== currentVideo?.id) {
    
      this.playVideo(firstVideo);
      this.playlist = playlist;
    
    } else if (firstVideo == null) {
    
      this.player && this.player.stopVideo();
      this.playlist = [];
    
    }
  }

  removeEventListener(eventName, callback) {
    if (eventName in this.subscriptions) {
      this.subscriptions[eventName] =
        this.subscriptions[eventName]
          .filter(listener => listener !== callback);
    }
  }
}

export default new OmniPlayer();
