//Sign up new email and password
var signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
	//Prevent force reload by browser
	e.preventDefault();
	var email = signupForm["signup-email"].value;
	var pass = signupForm["signup-password"].value;
	var uname = signupForm["signup-username"].value;
	
	//Refresh page only after adding username to database and send verification link
	firebase.auth().createUserWithEmailAndPassword(email, pass).then(user =>{
		if(!alert("Verification link sent to your email")){
			addUsername(uname);
			location.href = "index.html";
		}
	}).catch(function(error){
		var errorMessage = error.message;
		alert(errorMessage);
	});
	
	//Add username
	function addUsername(uname){
		firebase.auth().onAuthStateChanged(user => {
			user.updateProfile({
				displayName: uname
			});
		});
	}
});