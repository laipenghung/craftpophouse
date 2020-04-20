var loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) =>{
	e.preventDefault();
	
	var email = loginForm["login-email"].value;
	var pass = loginForm["login-password"].value;
	
	firebase.auth().signInWithEmailAndPassword(email, pass).then(result => {
		console.log(result.user);
		location.href="userLogin.html";
	}).catch(function(error){
		console.log(error);
		if(error.code == "auth/too-many-requests"){
			alert("Too many unsuccessful login attempts. Please try again later.");
		}
		else{
			alert("Wrong password");
		}
	});
});