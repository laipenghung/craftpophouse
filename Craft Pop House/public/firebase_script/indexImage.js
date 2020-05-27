var sellerProfileID = sessionStorage.getItem("sellerProfile");

// load top selling products
var topProducts = new Vue({
    el: '#hotSelling',
    data: {
      products : []
    },
    methods: {
        detail(id, cat, sellerID){
            //console.log(id);
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, sellerID){
			//Add to cart
			if(gUser == null){
				location.href = "registerDefault.html";
			}else{
				db.collection("users").doc(gUser.uid).collection("cartItem").doc(pid).set({
					prod_ID: pid,
					prod_name: pName,
					prod_price: pPrice,
                    order_quantity: firebase.firestore.FieldValue.increment(1),
                    sellerID: sellerID

				},{merge: true});
				
				db.collection("Products").doc(pid).update({
					prod_Quant: firebase.firestore.FieldValue.increment(-1)
				});
			}
		}
    },
    mounted() {
        const ref = firebase.firestore().collection('Products').orderBy("prod_Sold", "desc").limit(8);

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