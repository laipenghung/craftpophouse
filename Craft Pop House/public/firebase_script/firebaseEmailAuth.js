//Sign up new email and password
var signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
	//Prevent force reload by browser
	e.preventDefault();
	var email = signupForm["signup-email"].value;
	var pass = signupForm["signup-password"].value;
	
	firebase.auth().createUserWithEmailAndPassword(email, pass).then(result =>{
		if(!alert("Verification link sent to your email")){
			window.location.reload();
		}
	});
})