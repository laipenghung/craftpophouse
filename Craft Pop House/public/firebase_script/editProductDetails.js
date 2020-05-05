var prodID = sessionStorage.getItem("editProdID");

var product = new Vue({
    el: '#editProduct',
    data: {
        product : []
    },
    methods: {
        editProduct(){
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
                    //console.log('File available at', downloadURL);
                    
                    var updateTask = db.collection("Products").doc(prodID)
                    return updateTask.update({
                        prod_Name : document.getElementById("pName").value,
                        prod_Desc : document.getElementById("pDesc").value,
                        prod_Price : document.getElementById("pPrice").value,
                        prod_Quant : document.getElementById("pQuant").value,
                        prod_Cat : document.querySelector('input[name="gridRadios"]:checked').value,
                        url : downloadURL
                    })
                });

                alert("Data Successfully Update");
            });          
        }
    },
    mounted() {
        const ref = firebase.firestore().collection('Products').where("prod_Id", "==", prodID);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.product = porductArr;
        });
    },
});
