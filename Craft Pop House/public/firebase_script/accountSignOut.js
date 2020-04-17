$.getScript("firebase_script/firebaseConfig.js", function(){});

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log("User logged in");
	}
	else{
		console.log("User not logged in");
	}
});


function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("Sign-out success");
	}).catch(function(error){
		console.log("Error sign out");
	});
}