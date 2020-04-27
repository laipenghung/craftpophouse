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

//Send verification code to phone
function submitPhoneNumberAuth(){
	var phoneNumber = document.getElementById("registerPhone").value;
	var appVerifier = window.recaptchaVerifier;
	
	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function(confirmationResult){
		window.confirmationResult = confirmationResult;
		console.log("Sending verfication code to phone");
	}).catch(function(error){
		console.log("Error sending verfication code phone");
	});
}

//Confirm verification code
function submitPhoneNumberAuthCode(){
	var code = document.getElementById("phoneAuthCode").value;
	confirmationResult.confirm(code).then(function(result){
		console.log("Code verification success");
		location.href = "index.html";
	}).catch(function(error){
		console.log("Code verification error");
	});
}