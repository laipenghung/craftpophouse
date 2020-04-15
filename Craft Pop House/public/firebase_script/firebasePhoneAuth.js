var firebaseConfig = {
	apiKey: "AIzaSyDKwxkPZE9Bd455SYSDqmL9IFhVQCbdT3w",
	authDomain: "dp2-passtask.firebaseapp.com",
	databaseURL: "https://dp2-passtask.firebaseio.com",
	projectId: "dp2-passtask",
	storageBucket: "dp2-passtask.appspot.com",
	messagingSenderId: "784204115882",
	appId: "1:784204115882:web:347e81f44f328b326f45d3",
	measurementId: "G-JJ02GKQRJ5"
};

if(!firebase.apps.length){
	firebase.initializeApp({});
}

//Hide recaptcha of phone auth
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
	"recaptcha-container",
	{
		"size": "invisible",
		"callback": function(response){
			submitPhoneNumberAuth();
		}
	}
);

function submitPhoneNumberAuth(){
	var phoneNumber = document.getElementById("registerPhone").value;
	var appVerifier = window.recaptchaVerifier;
	
	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function(confirmationResult){
		window.confirmationResult = confirmationResult;
	}).catch(function(error){
		console.log(error);
	});
}

function submitPhoneNumberAuthCode(){
	var code = document.getElementById("phoneAuthCode").value;
	confirmationResult.confirm(code).then(function(result){
		var user = result.user;
		console.log("Signed in");
	}).catch(function(error){
		console.log("Error sign in");
	});
}

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log("USER LOGGED IN");
	}
	else{
		console.log("USER NOT LOGGED IN");
	}
});