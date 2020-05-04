var prodID = sessionStorage.getItem("cartProdID");
var orderQuant = sessionStorage.getItem("cartProdQuant");
var cartItemPrice = sessionStorage.getItem("cartTotal");
var dateString;
var subText;
var checkTransation = false;


var paypaltotal;

var item = new Vue({
    el: '#item',
    data: {
      item : []
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
            this.item = porductArr;
        });
    },
});

function loadDetail(){
    //Count the subtotal 
    var subtotal = parseInt(cartItemPrice) + 9.50;

    //cant get the quantity
    //document.getElementById("cartItemQuant").innerHTML = orderQuant;
    document.getElementById("cartItemTotal").innerHTML = "RM " + cartItemPrice;
    document.getElementById("itemTotal").innerHTML = "RM " + cartItemPrice;
    document.getElementById("subtotal").innerHTML = "RM " + subtotal;

    var getTime = new Date();
    dateString = getTime.toLocaleDateString();

    //convert to string
    subText = subtotal.toString();

    paypaltotal = parseFloat(subtotal).toFixed(2);
}

function saveShipAdd(){
    var shipName =  document.getElementById("shipName").value;
    var shipNum =  document.getElementById("shipNum").value;
    var shipAdd = document.getElementById("shipAdd").value;
    var shipCity = document.getElementById("shipCity").value;
    var e = document.getElementById("shipState");
    var shipState = e.options[e.selectedIndex].text;
    var shipPost= document.getElementById("shipPost").value;

    var fullShipAdd = shipAdd + ", " + shipPost + ", " + shipCity + ", " + shipState;
    document.getElementById("itemRec").innerHTML = shipName;
    document.getElementById("itemContact").innerHTML = shipNum;
    document.getElementById("fullShipAdd").innerHTML = fullShipAdd;
    //console.log(fullAdd);
    //console.log(shipName);
    //console.log(shipNum);
}

function saveBillAdd(){
    var billName =  document.getElementById("billName").value;
    var billNum =  document.getElementById("billNum").value;
    var billAdd = document.getElementById("billAdd").value;
    var billCity = document.getElementById("billCity").value;
    var e = document.getElementById("billState");
    var billState = e.options[e.selectedIndex].text;
    var billPost= document.getElementById("billPost").value;

    var fullBillAdd = billAdd + ", " + billPost + ", " + billCity + ", " + billState;
    //console.log(fullBillAdd);
    document.getElementById("fullBillAdd").innerHTML = fullBillAdd;
}

function confirmOrder(){
    //var oID;

    firebase.firestore().collection("users").doc(gUser.uid).collection("orders").add({
        //receiverName : shipName,
        //receiverContNum : shipNum,
        //shipAddress : fullShipAdd,
        //billAdd : fullBillAdd,
        orderDate : dateString,
        subtotal : subText
        //prodname
        //prodquant
    }).then(function(x) {
        var oID;
        oID = x.id;
        console.log(oID);
        var updateTask = firebase.firestore().collection("users").doc(gUser.uid).collection("orders").doc(oID)
        return updateTask.update({
            orderid : oID
        })
    });

    
    
    
}



// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    style: {
        layout: 'horizontal'
    },
     // Set up the transaction
    createOrder: function(data, actions) {
        //var x  = subtotal;
        //var total = x.value;

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: paypaltotal
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            
            checkTransation = true;

            if(checkTransation == 1){
                confirmOrder();
        
            }

            //confirmOrder();

            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    },
    
}).render('#paypal-button-container');


