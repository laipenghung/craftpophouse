var all = new Vue({
    el: '#all',
    data: {
      products : []
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

 var cloth = new Vue({
    el: '#cloth',
    data: {
      clothOnly : []
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
 });

 var jewelry = new Vue({
    el: '#jewelry',
    data: {
        jewelryOnly : []
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
            this.jewelryOnly = porductArr;
        });
    },
 });

 var craft = new Vue({
    el: '#craft',
    data: {
      craftOnly : []
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
 });

 var bed = new Vue({
    el: '#bed',
    data: {
      bedOnly : []
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
 });

 var toy = new Vue({
    el: '#toy',
    data: {
      toyOnly : []
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
 });

 var art = new Vue({
    el: '#art',
    data: {
      artOnly : []
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
 });

 var wedding = new Vue({
    el: '#wedding',
    data: {
      weddingOnly : []
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
 });
 

 function showAll(){
     var x = document.getElementById("cloth");
     x.style.display = "none";

     var x = document.getElementById("toy");
     x.style.display = "none";

     var x = document.getElementById("jewelry");
     x.style.display = "none";

     var x = document.getElementById("craft");
     x.style.display = "none";

     var x = document.getElementById("bed");
     x.style.display = "none";

     var x = document.getElementById("art");
     x.style.display = "none";

     var x = document.getElementById("wedding");
     x.style.display = "none";
 };

 function filterCloth(){
    var x = document.getElementById("cloth");
    x.style.display = "block";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 };

 function filterJewerly(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "block";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 }

 function filterCraft(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "block";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 }

 function filterBed(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "block";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 }

 function filterToy(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "block";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 }

 function filterArt(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "block";

    var x = document.getElementById("wedding");
    x.style.display = "none";
 }

 function filterWed(){
    var x = document.getElementById("cloth");
    x.style.display = "none";

    var x = document.getElementById("all");
    x.style.display = "none";

    var x = document.getElementById("toy");
    x.style.display = "none";

    var x = document.getElementById("jewelry");
    x.style.display = "none";

    var x = document.getElementById("craft");
    x.style.display = "none";

    var x = document.getElementById("bed");
    x.style.display = "none";

    var x = document.getElementById("art");
    x.style.display = "none";

    var x = document.getElementById("wedding");
    x.style.display = "block";
 }




 





