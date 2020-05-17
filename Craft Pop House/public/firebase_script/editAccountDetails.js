var editForm = document.querySelector("#editAccountForm");
var newUsername = editForm.eUsername;
var newPhone = editForm.ePhone;

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
	"recaptcha-container2",
	{
		"size": "invisible",
		"callback": function(response){
			
		}
	}
);

firebase.auth().onAuthStateChanged(function(user){
	if(user != null){
		newUsername.value = user.displayName;
		newPhone.value = user.phoneNumber;
		editProfile(user);
	}
	else{
		console.log("No user loging");
	}
});

function editProfile(user){
	editForm.addEventListener("submit", (e)=>{
		e.preventDefault();
		if(newUsername.value != ""){
			updateName(user);
		}else{
			alert("Please enter a name");
		}			
	});
}

function updateName(user){
	user.updateProfile({
		displayName: newUsername.value,
	}).then(function(){
		message(1);
	}).catch(function(error){
		message(error.message);
	});
}

function updatePhone(){
	var appVerifier = window.recaptchaVerifier;
	var phoneProvider = new firebase.auth.PhoneAuthProvider();

	phoneProvider.verifyPhoneNumber(newPhone.value, appVerifier).then(function(verificationID){
		let code = window.prompt("Please enter the 6 digit code");
		return firebase.auth.PhoneAuthProvider.credential(verificationID, code);
	}).then(function(phoneCredential){
		user.updatePhoneNumber(phoneCredential);
	}).catch(function(error){
		message(error.message);
	});	
}

function message(isSuccess){
	if(isSuccess==1){
		console.log("Update success");
		alert("Update success");
		location.reload();
	}
	else{
		alert(isSuccess);
		console.log("Update fail");
	}
}