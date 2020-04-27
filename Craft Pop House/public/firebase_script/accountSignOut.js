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
		$("#nav-placeholder").load("navbarLogin.html");
		$("#footer-placeholder").load("footer.html");
	}
	else{
		console.log("No user loging");
		$("#nav-placeholder").load("navbar.html");
		$("#footer-placeholder").load("footer.html");
	}
});

function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("Sign-out success");
	}).catch(function(error){
		console.log("Error sign out");
	});
}
