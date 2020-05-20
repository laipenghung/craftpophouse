//get user id
var userID = sessionStorage.getItem("uid");
//console.log(userID);
var checkReview, userProdReview, newProdReview;

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
        review(pid, oid){
            db.collection("users").doc(userID).collection("orders").doc(oid).get().then(doc => {
                //console.log(doc.data().prod_Review) 
                checkReview = doc.data().review
                console.log(checkReview);
            }).then(function (){
                if(checkReview == false){
                    //console.log(sessionStorage);
                    sessionStorage.setItem("reviewProdID", pid)
                    sessionStorage.setItem("reviewOrderID", oid)
                    window.open("review.html");
                }
                else {
                    alert("You Already Reviewed This Product")
                }
            })

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

function check(oid){
    db.collection("users").doc(userID).collection("orders").doc(oid).get().then(doc => {
        //console.log(doc.data().prod_Review) 
        checkReview = doc.data().review
    })
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