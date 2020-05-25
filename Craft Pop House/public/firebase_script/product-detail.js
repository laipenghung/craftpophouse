var prodID = sessionStorage.getItem("prod_Id");
var prodCat = sessionStorage.getItem("prod_Cat");
var prodSeller = sessionStorage.getItem("prod_Seller");
var dateString;

//window.onload = setSellerProfilePic();

function getProdCount(){
    var productCount;
    db.collection("Products").where("userID","==",prodSeller).get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
        productCount = querySnapshot.size;
    }).then(function(){
        document.getElementById("prodCount").innerHTML = productCount;
    });
}

function setSellerProfilePic() {
    //var URL
    db.collection("users").doc(prodSeller).get().then(doc => {      
        profilePicURL = doc.data().photoURL
    }).then(function(){
        //console.log("pic url", profilePicURL)
        document.getElementById("profileImage").src = profilePicURL;
    });
}

function getQuestionCount() {
    var QuesCount
    db.collection("question").where("prodID","==",prodID).get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
        QuesCount = querySnapshot.size;
    }).then(function(){
        document.getElementById("quesCount").innerHTML = QuesCount;
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
    document.getElementById("sellerProfileLink").href = "seller-profile.html";
    //window.open("seller-profile.html");
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

//add question to database
function addProdQuestion() {
    var getTime = new Date();
    dateString = getTime.toLocaleDateString();

    db.collection("question").add({
        prodID: prodID,
        prodQues: document.getElementById("pQues").value,
        postDate: firebase.firestore.FieldValue.serverTimestamp() 
    }).then(function(){
        alert("Question Successfully Posted");
		document.getElementById("quesForm").reset();
    });
}

//load question
var related = new Vue({
    el: '#Ques',
    data: {
      questions : []
    },
    mounted() {
        const ref = firebase.firestore().collection('question').where("prodID", "==", prodID).orderBy("postDate", "desc");

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let questionArr = [];
            snapshot.forEach(doc => {
                questionArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.questions = questionArr;
        });
    },
});

