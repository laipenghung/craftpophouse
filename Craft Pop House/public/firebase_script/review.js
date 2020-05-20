var userID = sessionStorage.getItem("uid");
var prodID = sessionStorage.getItem("reviewProdID");
var orderID = sessionStorage.getItem("reviewOrderID");
var userReview;

var reviewContent_Order = new Vue({
    el:'#reviewContent_Order',
    data:{
        order : []
    },
    mounted() {
        const ref = firebase.firestore().collection("users").doc(userID).collection("orders").where("orderid", "==", orderID);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let porductArr = [];
            snapshot.forEach(doc => {
                porductArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.order = porductArr;
        });
    },
});

function submitReview() {
    var userRating =  document.querySelector('input[name="customRadioInline1"]:checked').value;

    var getTime = new Date();
    var dateString = getTime.toLocaleDateString();

    db.collection("Products").doc(prodID).update({
        prod_ReviewCount: firebase.firestore.FieldValue.increment(1)
    })

    db.collection("reviews").add({
        userID : userID,
        prodID : prodID,
        orderID : orderID,
        reviewDate : dateString,
        prodRating : userRating,
        prodFeedback : document.getElementById("pFeedback").value
    }).then(function(){
        db.collection("users").doc(userID).collection("orders").doc(orderID).update({
            review : true
        })
        update = 1;
    }).then(function(){
        alert("Review Successfully Submitted")
    }).then(function(){
        if(update == 1)
            if(confirm("Click ok to close this page")){
                window.close();
            }
    })
}