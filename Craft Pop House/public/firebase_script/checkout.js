var checkTransation = false;

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
    db.collection("users").doc(gUser.uid).collection("Orders").add({

    })
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
                    value: '1.99'
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
            checkTransation = true;

            if(checkTransation == true){
                confirmOrder();
            }
        });
    }
}).render('#paypal-button-container');

