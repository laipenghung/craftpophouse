var prodID = sessionStorage.getItem("prod_Id");
var prodCat = sessionStorage.getItem("prod_Cat");

var content = new Vue({
    el: '#content',
    data: {
      products : []
    },
    methods: {
		//QUANTITY TO FIX
		addToCart(pid, pName, pPrice){
			//Add to cart
			var selectQuant = document.getElementById("detailsQuant");
			var quantity = parseInt(selectQuant.options[selectQuant.selectedIndex].value);
			
			db.collection("users").doc(gUser.uid).
			collection("cartItem").doc(pid).set({
				prod_ID: pid,
				prod_name: pName,
				prod_price: pPrice,
				order_quantity: firebase.firestore.FieldValue.increment(quantity)

			},{merge: true});
			
			db.collection("Products").doc(pid).update({
				prod_Quant: firebase.firestore.FieldValue.increment(-quantity)
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