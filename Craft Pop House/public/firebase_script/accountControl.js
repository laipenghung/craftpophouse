var db = firebase.firestore();
var gUser;

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
		switchNavBar("navbarLogin");
		accountDB(user);
		gUser=user;
	}
	else{
		console.log("No user loging");
		switchNavBar("navbar");
	}
});

//Add user info to database
function accountDB(user){
	db.collection("users").doc(user.uid).set({
		username:  user.displayName
	});
}

//Switch navbar
function switchNavBar(navType){
	if(navType == "navbarLogin"){
		$("#nav-placeholder").load(navType+".html");
	}
	else{
		$("#nav-placeholder").load(navType+".html");
	}
	$("#footer-placeholder").load("footer.html");
}

function getUserProfile(){
	displayName = document.getElementById("displayName")
	displayName.style.color = "white";
	displayName.innerText = gUser.displayName;
}

//Sign out
function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("Sign-out success");
	}).catch(function(error){
		console.log("Error sign out");
	});
}

/*firebase.firestore().collection("users").get().then(snapshot => {
	data = snapshot.docs;
	data.forEach(doc =>{
		console.log(doc.data());	
	});
})*/