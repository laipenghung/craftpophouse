var sellerProfileID = sessionStorage.getItem("sellerProfile");

function getProdCount(){
    var productCount;
    db.collection("Products").where("userID","==",sellerProfileID).get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
        productCount = querySnapshot.size;
    }).then(function(){
        document.getElementById("prodCount").innerHTML = productCount;
    });
};

function setSellerProfilePic() {
    var URL
    db.collection("users").doc(sellerProfileID).get().then(doc => {      
        URL = doc.data().photoURL
    }).then(function(){
        console.log("pic url", URL)
        //document.getElementById("prodCount").innerHTML = productCount;
        document.getElementById("profileIMG").src = URL;
    });
}

//load profile
var seller = new Vue({
    el: '#seller',
    data: {
      seller : []
    },
    mounted() {
        const ref = firebase.firestore().collection('users').where("userID", "==", sellerProfileID);

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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).orderBy("prod_Sold", "desc").limit(5);

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

//load products sell by seller
var all = new Vue({
    el: '#seller_all',
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID);

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

var clothOnly = new Vue({
    el: '#seller_clothOnly',
    data: {
        clothOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "clothing");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.clothOnly = porductArr;
        });
    },
});

var jewOnly = new Vue({
    el: '#seller_jewOnly',
    data: {
        jewOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "jewelry");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.jewOnly = porductArr;
        });
    },
});

var craftOnly = new Vue({
    el: '#seller_craftOnly',
    data: {
        craftOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "craft");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.craftOnly = porductArr;
        });
    },
});

var bedOnly = new Vue({
    el: '#seller_bedOnly',
    data: {
        bedOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "bedding");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.bedOnly = porductArr;
        });
    },
});

var toyOnly = new Vue({
    el: '#seller_toyOnly',
    data: {
        toyOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "toys");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.toyOnly = porductArr;
        });
    },
});

var artOnly = new Vue({
    el: '#seller_artOnly',
    data: {
        artOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "arts");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.artOnly = porductArr;
        });
    },
});

var weddingOnly = new Vue({
    el: '#seller_weddingOnly',
    data: {
        weddingOnly : []
    },
    methods: {
        detail(id, cat){
            sessionStorage.setItem("prod_Id", id);
            sessionStorage.setItem("prod_Cat", cat);
            sessionStorage.setItem("prod_Seller", sellerID);
            console.log(sessionStorage);
            window.open("products-details.html");
        },
		addToCart(pid, pName, pPrice, pQuant){
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
        const ref = firebase.firestore().collection('Products').where("userID","==", sellerProfileID).where("prod_Cat", "==", "wedding");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.weddingOnly = porductArr;
        });
    },
});

//filter
//function seller_showAll(){
    //document.getElementById("catInfo").innerHTML = "Showing All Products";

    //var x = document.getElementById("seller_all");
    //x.style.display = "block";

    //var x = document.getElementById("seller_clothOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_jewOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_craftOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_bedOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_toyOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_artOnly");
    //x.style.display = "none";

    //var x = document.getElementById("seller_weddingOnly");
    //x.style.display = "none";
//};

