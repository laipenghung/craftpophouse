var loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) =>{
	e.preventDefault();
	
	var email = loginForm["login-email"].value;
	var pass = loginForm["login-password"].value;
	
	firebase.auth().signInWithEmailAndPassword(email, pass).then(result => {
		console.log(result.user);
		location.href="fakeIndex.html";
	}).catch(error => {
		console.log(error);
		if(error.code == "auth/too-many-requests"){
			alert("Too many unsuccessful login attempts. Please try again later.");
		}
		else{
			alert("Wrong password");
		}
	});
});

function submitForgotPassword(){
	var forgetPass = loginForm["forgotPassEmail"].value;
	
	firebase.auth().sendPasswordResetEmail(forgetPass).then(result => {
		alert("Password reset is send to your email");
	}).catch(error => {
		
	});
}