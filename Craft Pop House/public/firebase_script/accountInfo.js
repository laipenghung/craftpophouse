firebase.auth().onAuthStateChanged(function(user){
	var name, email, uid;
	if (user != null) {
	  name = user.displayName;
	  email = user.email;
	  uid = user.uid; 
	  document.getElementById("n").innerText = name;
	  document.getElementById("e").innerText = email;
	  document.getElementById("uid").innerText = uid;
	}
});

firebase.firestore().collection("users").get().then(snapshot => {
	data = snapshot.docs;
	data.forEach(doc =>{
		console.log(doc.data());	
	});
})

