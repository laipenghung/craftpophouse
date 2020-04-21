firebase.auth().onAuthStateChanged(function(user){
	console.log(user);
	if(user != null){
		if(user.emailVerified == false){
			user.sendEmailVerification();
			console.log("Send verification email");
		}
		else{
			console.log("User is verified");
		}
	}
	else{
		console.log("No user loging");
	}
});


function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("Sign-out success");
	}).catch(function(error){
		console.log("Error sign out");
	});
}