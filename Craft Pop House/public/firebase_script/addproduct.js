function testfunction(){
  var file = document.getElementById("pImage").files[0];
  var storageRef = firebase.storage().ref("prodImages/" + file.name);
  var uploadTask = storageRef.put(file); 
    
  uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
		// Handle unsuccessful uploads
    }, function() {
		// Handle successful uploads on complete
		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			//downloadURLx = downloadURL;
			console.log('File available at', downloadURL);
			
			//Store new product in db
			db.collection("Products").add({
				userID: gUser.uid,
				username: gUser.displayName,
				url: downloadURL,
				prod_Name : document.getElementById("pName").value,
				prod_Desc : document.getElementById("pDesc").value,
				prod_Price : document.getElementById("pPrice").value,
				prod_Quant : document.getElementById("pQuant").value,
				prod_Cat : document.querySelector('input[name="gridRadios"]:checked').value
			})
			.then(function(x){
			  console.log("Document written with ID: ", x.id);
			  var pId;
			  pId = x.id;
			  addToUser(pId);
			  var updateTask = db.collection("Products").doc(pId)
			  return updateTask.update({
				  prod_Id : pId
			  })
			});
			alert("Succuessful Added");
			document.getElementById("addProductForm").reset();
		});
	});
}

//Keep record in user account
function addToUser(pId){
	db.collection("users").doc(gUser.uid).
	collection("products").add({
		prod_ID: pId
	});
}
