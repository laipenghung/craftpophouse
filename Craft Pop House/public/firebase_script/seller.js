var cotent = new Vue({
    el: '#content',
    data: {
      products : []
    },
    methods: {
        removeProduct(id){
            //console.log(id);

            firebase.firestore().collection("Products").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    },
    mounted() {
        const ref = firebase.firestore().collection('Products').where("userID", "==", gUser.uid);

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