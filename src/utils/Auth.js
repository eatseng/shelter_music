class Auth {

  constructor () {
    this.auth2 = null;
    this.isGoogleAuthenticated = false;
    this.isGoogleLoaded = false;
    this.subscriptions = {};
    
    const signinChanged = (val) => this.isGoogleAuthenticated = val;

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('client:auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          clientId: process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        window['gapi'].client.init({
          apiKey: process.env.REACT_APP_GOOGLE_SIGN_IN_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID,
          'discoveryDocs': [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          'scope': "https://www.googleapis.com/auth/youtube.force-ssl",
        })

        // Listen for sign-in state changes.
        this.auth2.isSignedIn.listen(signinChanged);

        this.auth2.then(
          (auth2) => {
            this.authenticate();
            (this.subscriptions['authLoadSuccess'] || [])
              .map(callback => callback(auth2));
          },
          (error) => {
            (this.subscriptions['failure'] || [])
              .map(callback => callback({error}));
          },
        );
        this.isGoogleLoaded = true;
      });
    }
    
    if (this.isGoogleLoaded !== true) {
      (function(d, element, id){
        const [fjs] = d.getElementsByTagName(element);
        if (d.getElementById(id)) {return;}
        
        const script = d.createElement(element);
        script.id = id;
        script.src =
          "https://apis.google.com/js/api.js?onload=googleSDKLoaded";
        fjs.parentNode.insertBefore(script, fjs);
      }(document, 'script', 'google-jssdk'));
    }
  }

  addEventListener (eventName, callback) {
    if (eventName in this.subscriptions !== true) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
  }

  authenticate (onSuccess = () => {}, onFailure = () => {}) {
    const googleUser = this.auth2.currentUser.get();
    if (googleUser.isSignedIn() === true) {
      this._authenticateRequest(
        googleUser.getAuthResponse().id_token,
        onSuccess,
        onFailure,
      );
    } else {
      this.subscriptions['failure'].map(
        callback =>
          callback({error: `Google user not signed in!`}),
      );
    }
  }

  authenticateYoutube (onSuccess = () => {}, onFailure = () => {}) {
    const googleUser = this.auth2.currentUser.get();
    return googleUser.grant(
      {scope: "https://www.googleapis.com/auth/youtube.force-ssl"},
    );
  }

  _authenticateRequest (idToken, onSuccess, onFailure) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_SERVER_END_POINT}:4000/login`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.withCredentials = true;
    xhr.onload = () => {
      this.isGoogleAuthenticated = true;
      if (xhr.status !== 200) {
        this.subscriptions['failure'].map(
          callback =>
            callback({error: `${xhr.status} Google authentication failed!`}),
        );
        this.isGoogleAuthenticated = false;
        onFailure({error: xhr.status});
      } else {
        onSuccess();
        (this.subscriptions['authSuccess'] || [])
          .map(callback => callback(this.auth2));
      }
    };
    xhr.send(`idToken=${idToken}`);
  }
  
  isAuthenticated() {
    return this.auth2 != null &&
      this.auth2.isSignedIn.get() &&
      this.isGoogleAuthenticated === true;
  }

  isLoaded() {
    return this.isGoogleLoaded;
  }

  async login() {
    await this.auth2.signIn();
    return new Promise(
      (resolve, reject) => this.authenticate(resolve, reject),
    );
  }

  logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_SERVER_END_POINT}:4000/logout`);
    xhr.withCredentials = true;
    xhr.onload = () => {
      if (xhr.status !== 200) {
        (this.subscriptions['failure'] || []).map(
          callback => callback(`${xhr.status} Google authentication failed!`),
        );
      }
    };
    xhr.send();
    return this.auth2.disconnect();
  }

  removeEventListener (eventName, callback) {
    if (eventName in this.subscriptions) {
      this.subscriptions[eventName] =
        this.subscriptions[eventName]
          .filter(listener => listener !== callback);
    }
  }
}

export default new Auth();
