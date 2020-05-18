var editForm = document.querySelector("#editAccountForm");
var newUsername = editForm.eUsername;
var newPhone = editForm.ePhone;
var newImage = editForm.eImage;

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
			if(newPhone.value != ""){
				updateName(user);
				if(newImage.files.length != 0){
					uploadAvatar(user);
				}
				validatePhone(user);
			}else{
				alert("Please enter a number");
			}
		}else{
			alert("Please enter a name");
		}			
	});
}

function updateName(user){
	user.updateProfile({
		displayName: newUsername.value,
	}).then(function(){
		
	}).catch(function(error){
		alert(error.message);
	});
}

function uploadAvatar(user){
	let storageAvatar = firebase.storage().ref("profileAvatar/" + user.uid + "/" + newImage.files[0].name);
	storageAvatar.put(newImage.files[0]).then(function(result){
		storageAvatar.getDownloadURL().then(function(url){
			updateAvatar(user, url);
		});	
	});
}

function updateAvatar(user, url){	
	user.updateProfile({
		photoURL: url
	}).then(function(){
		
	}).catch(function(error){
		alert(error.message);
	});
}

function validatePhone(user){
	var appVerifier = window.recaptchaVerifier;
	var phoneProvider = new firebase.auth.PhoneAuthProvider();
	
	phoneProvider.verifyPhoneNumber(newPhone.value, appVerifier).then(function(verificationID){
		let code = window.prompt("Please enter the 6 digit code");
		let phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationID, code);
		updatePhone(user, phoneCredential);
	}).then(function(){
		
	}).catch(function(error){
		alert(error.message);
		console.log(error.message);
	});
}

function updatePhone(user,phoneCredential){
	user.updatePhoneNumber(phoneCredential).then(function(){
		alert("Update success");
		location.reload();
	});
}