
# Firebase-Commentify

This is a github repo which uses firebase to store the comments. 

### Click on the following links to see the demo.
* [Angular Version](https://melwinalm.github.io/Firebase-Commentify/Angular/)
* [jQuery Version](https://melwinalm.github.io/Firebase-Commentify/jQuery/)

### Following are the features
* Supports threaded comments
* No login required
* Easy to setup
* Both Angular and jQuery versions are available. Depending on the compatibility of the site use one of the version

### How to use

* Change the config information in app.js file
* Change the blogId variable

```javascript
	// Initialize Firebase
	var config = {
		apiKey: "your api key",
		databaseURL: "your database URL"
	};
	firebase.initializeApp(config);
	
	var blogId = "12345";
```
* Change the security rules in firebase
