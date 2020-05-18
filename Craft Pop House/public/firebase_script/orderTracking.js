//get user id
var userID = sessionStorage.getItem("uid");
var orderID = sessionStorage.getItem("viewOrderID");

var content = new Vue({
    el:'#orderTracking_content',
    data:{
        order : []
    },
    mounted() {
        const ref = firebase.firestore().collection("users").doc(userID).collection("orders").where("orderid", "==", orderID);

        ref.onSnapshot(snapshot =>{
            //console.log(snapshot);
        
            let orderArr = [];
            snapshot.forEach(doc => {
                orderArr.push({...doc.data(), id: doc.id})
            });
            //console.log(snapshot);
            this.order = orderArr;
        });
    },
});