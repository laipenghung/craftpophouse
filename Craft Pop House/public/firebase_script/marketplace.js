//get user id
var userID = sessionStorage.getItem("uid");
//console.log(userID);

var cotent = new Vue({
    el: '#content',
    data: {
      products : []
    },
    methods: {
        removeProduct(id){
            //console.log(id);

            if(confirm("Are you sure you want to delete this item?")){
                firebase.firestore().collection("Products").doc(id).delete().then(function() {
                    //firebase.firestore().collection("users").doc(userID).collection("products").where("prod_ID", "==", id).delete();
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                }).then(alert("Item successfully delete"));
            }

        },
        editProduct(id){
            sessionStorage.setItem("editProdID", id);
            window.open("edit-product-details.html");
        }
    },
    mounted() {
        const ref = firebase.firestore().collection('Products').where("userID", "==", userID);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.products = porductArr;
        });
    },
});
