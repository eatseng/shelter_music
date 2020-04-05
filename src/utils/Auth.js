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
          client_id: '990982699847-5gbnem13btv2gd15vnbuomovr6miupua.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        // Listen for sign-in state changes.
        this.auth2.isSignedIn.listen(signinChanged);

        this.auth2.then(
          (onSuccess) => {
            Object.values(this.success).map(callback => callback(onSuccess));
          },
          (error) => {
            Object.values(this.failure).map(callback => callback(error));
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
  
  isAuthenticated() {
    return this.auth2 != null && this.auth2.isSignedIn.get();
  }

  isLoaded() {
    return this.isGoogleLoaded;
  }

  login() {
    return this.auth2.signIn();
  }

  logout() {
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
