var prodID = sessionStorage.getItem("prod_Id");
var prodCat = sessionStorage.getItem("prod_Cat");
var prodSeller = sessionStorage.getItem("prod_Seller");

function getProdCount(){
    var productCount;
    db.collection("Products").where("userID","==",prodSeller).get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
        productCount = querySnapshot.size;
    }).then(function(){
        document.getElementById("prodCount").innerHTML = productCount;
    });
}

var content = new Vue({
    el: '#content',
    data: {
      products : []
    },
    methods: {
		//QUANTITY TO FIX
		addToCart(pid, pName, pPrice){
			//Add to cart
			if(gUser == null){
				location.href = "registerDefault.html";
			}else{
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

//Load product seller
var seller = new Vue({
    el: '#seller',
    data: {
      seller : []
    },
    mounted() {
        const ref = firebase.firestore().collection('users').where("userID", "==", prodSeller);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let sellerArr = [];
            snapshot.forEach(doc => {
                sellerArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.seller = sellerArr;
        });
    },
});

function visitSellerProfile(){
    sessionStorage.setItem("sellerProfile", prodSeller);
    window.open("seller-profile.html");
    //console.log(sessionStorage);
}

//Load related product
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