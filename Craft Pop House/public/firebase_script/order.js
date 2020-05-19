//get user id
var userID = sessionStorage.getItem("uid");
//console.log(userID);
var currentProdReview, userProdReview, newProdReview;

var content = new Vue({
    el:'#orderDetail_content',
    data:{
        products : []
    },
    methods:{
        viewOrder(oid){
            //console.log(oid);
            sessionStorage.setItem("viewOrderID", oid)
            document.getElementById("link").href = "orderTracking.html";
        },
        review(pid){
            console.log(pid);
            sessionStorage.setItem("reviewProdID", pid)
            document.getElementById("reviewLink").href = "review.html";
        }
    },
    mounted() {
        const ref = firebase.firestore().collection("users").doc(userID).collection("orders");

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

function countReviewAverage(){
    newProdReview = (currentProdReview + newProdReview) / reviewCount;
}

function addReviewCount(){
    db.collection("Products").doc(pid).update({
        prod_ReviewCount: firebase.firestore.FieldValue.increment(1)
    })
}

function submitReview() {
    db.collection("Products").doc(pid).get().then(doc => {
        //console.log(doc.data().prod_Review) 
        currentProdReview = doc.data().prod_Review
    }).then(function(){
        console.log(currentProdReview);
    })
}