class Auth {

  constructor () {
    this.auth2 = null;
    this.failure = {};
    this.isGoogleAuthenticated = false;
    this.isGoogleLoaded = false;
    this.success = {};
    
    const signinChanged = (val) => this.isGoogleAuthenticated = val;

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        // Listen for sign-in state changes.
        this.auth2.isSignedIn.listen(signinChanged);

        this.auth2.then(
          (auth2) => {
            this.authenticate();
            Object.values(this.success).map(callback => callback(auth2));
          },
          (error) => {
            Object.values(this.failure).map(callback => callback({error}));
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
        script.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
        fjs.parentNode.insertBefore(script, fjs);
      }(document, 'script', 'google-jssdk'));
    }
  }

  authenticate (onSuccess = () => {}, onFailure = () => {}) {
    const googleUser = this.auth2.currentUser.get();
    if (googleUser.isSignedIn() === true) {
      this._authenticateRequest(
        googleUser.getAuthResponse().id_token,
        onSuccess,
        onFailure,
      );
    }
  }

  _authenticateRequest (idToken, onSuccess, onFailure) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_SERVER_END_POINT}/login`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.withCredentials = true;
    xhr.onload = () => {
      this.isGoogleAuthenticated = true;
      if (xhr.status !== 200) {
        Object.values(this.failure).map(
          callback =>
            callback({error: `${xhr.status} Google authentication failed!`}),
        );
        this.isGoogleAuthenticated = false;
        onFailure({error: xhr.status});
      } else {
        onSuccess()
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
    return new Promise((resolve, reject) => this.authenticate(resolve, reject))
  }

  logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_SERVER_END_POINT}/logout`);
    xhr.withCredentials = true;
    xhr.onload = () => {
      if (xhr.status !== 200) {
        Object.values(this.failure).map(
          callback => callback(`${xhr.status} Google authentication failed!`)
        );
      }
    };
    xhr.send();
    return this.auth2.disconnect();
  }

  registerFailure(id, callback) {
    if (id in this.failure !== true) {
      this.failure[id] = callback;
    }
  }

  registerSuccess(id, callback) {
    if (id in this.success !== true) {
      this.success[id] = callback;
    }
  }

  removeFailure(id) {
    delete this.failure[id];
  }

  removeSuccess(id) {
    delete this.success[id];
  }
}

export default new Auth();
