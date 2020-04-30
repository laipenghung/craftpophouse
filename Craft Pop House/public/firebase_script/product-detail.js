var prodID = sessionStorage.getItem("prod_Id");
var prodCat = sessionStorage.getItem("prod_Cat");

var content = new Vue({
    el: '#content',
    data: {
      products : []
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
            this.products = porductArr;
        });
    },
});


var related = new Vue({
    el: '#related',
    data: {
      products : []
    },
    mounted() {
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", prodCat).limit(5);

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