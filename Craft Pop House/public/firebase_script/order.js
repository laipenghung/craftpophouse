//get user id
var userID = sessionStorage.getItem("uid");
//console.log(userID);

var content = new Vue({
    methods:{
        viewOrder(oid){
            //console.log(oid);
            sessionStorage.setItem("viewOrderID", oid)
            document.getElementById("link").href = "orderTracking.html";
        },
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