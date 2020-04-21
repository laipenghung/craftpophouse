//Sign up new email and password
var signupForm = document.querySelector("#signup-form");
var db = firebase.firestore();

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
			window.location.reload();
		}
	});
	
	//Add username to database
	function addUsername(uname){
		firebase.auth().onAuthStateChanged(user => {
			user.updateProfile({
				displayName: uname
			});
			
			return db.collection("users").doc(user.uid).set({
				username: uname
			});
		});
	}
});