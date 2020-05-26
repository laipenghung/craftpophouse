var searchOnly = new Vue({
    el: '#searchOnly',
    data: {
      products : [],
	  perPage: 2,
	  currPage: 1
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
		const searchValues = sessionStorage.getItem("searchValues");
		console.log(searchValues);
        const ref = firebase.firestore().collection('Products').where("SEO", "array-contains-any", [searchValues.toLowerCase()]);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.products = porductArr;
			sessionStorage.setItem("searchValues", "");
        });
    },
	computed:{
		rows(){return ((this.products.length-1)/3)}
	}
});

var all = new Vue({
    el: '#all',
    data: {
      products : [],
	  perPage: 2,
	  currPage: 1
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
        const ref = firebase.firestore().collection('Products');

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
	computed:{
		rows(){return ((this.products.length-1)/3)}
	}
});

var clothOnly = new Vue({
    el: '#clothOnly',
    data: {
        clothOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "clothing");

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
	computed:{
		rows(){return ((this.clothOnly.length-1)/3)}
	}
});

var jewOnly = new Vue({
    el: '#jewOnly',
    data: {
        jewOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "jewelry");

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
	computed:{
		rows(){return ((this.jewOnly.length-1)/3)}
	}
});

var craftOnly = new Vue({
    el: '#craftOnly',
    data: {
        craftOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "craft");

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
	computed:{
		rows(){return ((this.craftOnly.length-1)/3)}
	}
});

var bedOnly = new Vue({
    el: '#bedOnly',
    data: {
        bedOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "bedding");

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
	computed:{
		rows(){return ((this.bedOnly.length-1)/3)}
	}
});

var toyOnly = new Vue({
    el: '#toyOnly',
    data: {
        toyOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "toys");

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
	computed:{
		rows(){return ((this.toyOnly.length-1)/3)}
	}
});

var artOnly = new Vue({
    el: '#artOnly',
    data: {
        artOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "arts");

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
	computed:{
		rows(){return ((this.artOnly.length-1)/3)}
	}
});

var weddingOnly = new Vue({
    el: '#weddingOnly',
    data: {
        weddingOnly : [],
		perPage: 2,
		currPage: 1
    },
    methods: {
        detail(id, cat, sellerID){
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
        const ref = firebase.firestore().collection('Products').where("prod_Cat", "==", "wedding");

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
	computed:{
		rows(){return ((this.weddingOnly.length-1)/3)}
	}
});

function Onload(){
	if(sessionStorage.getItem("sequence")==1){
		filterSearch();
		sessionStorage.setItem("sequence", 0);
	}else{
		showAll();
	}
}


function filterSearch(){
	var x = document.getElementById("searchOnly");
	x.style.display = "block";
		
	var x = document.getElementById("all");
	x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function showAll(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";	
	
    var x = document.getElementById("all");
    x.style.display = "block";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterCloth(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";	
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "block";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterJew(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";	
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "block";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterCraft(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";	
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "block";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterBed(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "block";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterToy(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";	
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "block";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterArt(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "block";

    var x = document.getElementById("weddingOnly");
    x.style.display = "none";
};

function filterWed(){
	var x = document.getElementById("searchOnly");
    x.style.display = "none";
	
    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("clothOnly");
    x.style.display = "none";

    var x = document.getElementById("jewOnly");
    x.style.display = "none";

    var x = document.getElementById("craftOnly");
    x.style.display = "none";

    var x = document.getElementById("bedOnly");
    x.style.display = "none";

    var x = document.getElementById("toyOnly");
    x.style.display = "none";

    var x = document.getElementById("artOnly");
    x.style.display = "none";

    var x = document.getElementById("weddingOnly");
    x.style.display = "block";
};