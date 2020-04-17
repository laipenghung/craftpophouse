$.getScript("firebase_script/firebaseConfig.js", function(){});

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