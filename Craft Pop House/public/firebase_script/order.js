//get user id
var userID = sessionStorage.getItem("uid");
//console.log(userID);

var cotent = new Vue({
    el: '#orderDetail_content',
    data: {
      products : []
    },
    methods: {
        mounted() {
            const ref = firebase.firestore().collection("users").doc(gUser.uid).collection("orders");

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