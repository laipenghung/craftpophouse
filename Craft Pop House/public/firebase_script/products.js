var all = new Vue({
    el: '#all',
    data: {
      products : []
    },
    methods: {
        test(id){
            console.log(id);
            sessionStorage.setItem("prod_Id", id);
            console.log(localStorage);
            window.open("http://localhost:5000/products-details.html");
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
 });
