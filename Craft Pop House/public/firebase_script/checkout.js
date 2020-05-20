var prodID = sessionStorage.getItem("cartProdID");
var orderQuant = sessionStorage.getItem("cartProdQuant");
var cartItemPrice = sessionStorage.getItem("cartTotal");
var cartProdName = sessionStorage.getItem("cartProdName");
var cartProdImgUrl = sessionStorage.getItem("cartProdImgUrl");
var cartSellerID =  sessionStorage.getItem("cartSellerID");
var checkTransation = false;
var shipName, shipNum, fullShipAdd, fullBillAdd, subTotalFoat, subText, dateString, shipCity, shipState, shipPost, oID;

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
    //Convert to float
    subTotalFoat = parseFloat(subtotal).toFixed(2);

    //cant get the quantity
    document.getElementById("cartItemQuant").innerHTML = orderQuant;
    document.getElementById("cartItemTotal").innerHTML = "RM " + cartItemPrice;
    document.getElementById("itemTotal").innerHTML = "RM " + cartItemPrice;
    document.getElementById("subtotal").innerHTML = "RM " + subTotalFoat;

    var getTime = new Date();
    dateString = getTime.toLocaleDateString();

    //convert to string (For firebase upload)
    subText = subTotalFoat.toString();
}

function saveShipAdd(){
    var e = document.getElementById("shipState");
    shipName =  document.getElementById("shipName").value;
    shipNum =  document.getElementById("shipNum").value;
    shipAdd = document.getElementById("shipAdd").value;
    shipCity = document.getElementById("shipCity").value;
    shipState = e.options[e.selectedIndex].text;
    shipPost= document.getElementById("shipPost").value;

    //Display full shipping address
    fullShipAdd = shipAdd + ", " + shipPost + ", " + shipCity + ", " + shipState;
    document.getElementById("itemRec").innerHTML = shipName;
    document.getElementById("itemContact").innerHTML = shipNum;
    document.getElementById("fullShipAdd").innerHTML = fullShipAdd;

    if(confirm("Shipping Details confirmed \nDo you want to Bill to same address?")){
        billSameAdd();
        saveBillAdd();
    }
    //console.log(fullAdd);
    //console.log(shipName);
    //console.log(shipNum);
}

function billSameAdd(){
    document.getElementById("billName").value = shipName;
    document.getElementById("billNum").value = shipNum;
    document.getElementById("billAdd").value = shipAdd;
    document.getElementById("billCity").value = shipCity;
    document.getElementById("billState").value = shipState;
    document.getElementById("billPost").value = shipPost;
}

function saveBillAdd(){
    var billName =  document.getElementById("billName").value;
    var billNum =  document.getElementById("billNum").value;
    var billAdd = document.getElementById("billAdd").value;
    var billCity = document.getElementById("billCity").value;
    var e = document.getElementById("billState");
    var billState = e.options[e.selectedIndex].text;
    var billPost= document.getElementById("billPost").value;

    //Display full billing address
    fullBillAdd = billAdd + ", " + billPost + ", " + billCity + ", " + billState;
    document.getElementById("fullBillAdd").innerHTML = fullBillAdd;

    alert("Billing Details confirmed");
}

function confirmOrder(){
    firebase.firestore().collection("users").doc(gUser.uid).collection("orders").add({
        receiverName : shipName,
        receiverContNum : shipNum,
        shipAddress : fullShipAdd,
        billAdd : fullBillAdd,
        orderDate : dateString,
        prodID : prodID,
        prodName : cartProdName,
        prodImgUrl : cartProdImgUrl,
        orderQuant : orderQuant,
        subtotal : subText,
        seller : cartSellerID,
        review : false
    }).then(function(x) {
        oID = x.id;;
        console.log(oID);
        var updateTask = firebase.firestore().collection("users").doc(gUser.uid).collection("orders").doc(oID)
        return updateTask.update({
            orderid : oID
        })
    });
    console.log("orders successfully upload to database");
}

function removeCart(){
    db.collection("users").doc(gUser.uid).collection("cartItem").doc(prodID).delete();
}

function prodSoldCounter(){
    var quantInt = parseInt(orderQuant);
    //console.log(quantInt);
    db.collection("Products").doc(prodID).update({
        prod_Sold: firebase.firestore.FieldValue.increment(quantInt)
    });
}

//unfinished
function selerSoldCounter(){
    var quantInt = parseInt(orderQuant);
    
    var docRef = firebase.firestore().collection("users").doc(cartSellerID).collection("sold");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    style: {
        layout: 'horizontal'
    },
     // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: "0.1"
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Update database if the transaction is completed
            checkTransation = true;
            if(checkTransation == 1){
                confirmOrder();
                removeCart();
                prodSoldCounter();
                //selerSoldCounter();
            }
        
            // Show a success message to the buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        }).then(function(){
            alert("You can close this page and track your order at order page.");
        });
    },
    
}).render('#paypal-button-container');


