var cartList = document.querySelector("#cartList");
var gUser;
firebase.auth().onAuthStateChanged(function(user){
	if(user != null){
		gUser = user;
		userCart();
	}
});

function userCart(){
	db.collection("users").doc(gUser.uid).collection("cartItem").onSnapshot(snapshot => {
		let changes = snapshot.docChanges();
		changes.forEach(change =>{
			if(change.type == "added"){
				dbProducts(change.doc);
			}
			else if(change.type == "removed"){
				location.reload();
				let tr = cartList.querySelector("[data-id=" + change.doc.id + "]");
				cartList.removeChild(tr);
			}
		});
	});
}

function dbProducts(userDoc){
	db.collection("Products").doc(userDoc.data().prod_ID).get().then(doc => {
		if(doc.exists){
			renderCart(doc, userDoc);
		} else{
			console.log("No products or have been removed");
		}
	});
}

function renderCart(doc, userDoc){
	let tr = document.createElement("tr");
	let tdImg = document.createElement("td");
	let pImg = document.createElement("img");
	let pName = document.createElement("td");
	let pPrice = document.createElement("td");
	let pQuantity = document.createElement("td");
	let pTotal = document.createElement("td");
	let pActions = document.createElement("td");
	let remove = document.createElement("a");
	let checkout = document.createElement("button");
	let br = document.createElement("br");
	
	//remove
	remove.textContent = "Remove";
	tr.setAttribute("data-id", userDoc.id);
	remove.setAttribute("href", "#");
	remove.setAttribute("class", "btn btn-warning btn-block");
	removeFromDB(remove);
	
	//checkout
	checkout.textContent = "Check Out";
	checkout.setAttribute("class", "btn btn-danger btn-block");
	pActions.appendChild(remove);
	pActions.appendChild(br);
	pActions.appendChild(checkout);
	pActions.setAttribute("style", "vertical-align:middle");
	checkout();
	
	//img
	pImg.src = doc.data().url;
	pImg.height = 150;
	pImg.width = 150;
	tdImg.appendChild(pImg);
	tdImg.setAttribute("class", "text-center");

	//Product name
	pName.textContent = doc.data().prod_Name;
	pName.setAttribute("style", "vertical-align:middle");
	
	//Product unit price
	pPrice.textContent = doc.data().prod_Price;
	pPrice.setAttribute("style", "vertical-align:middle");
	
	//Product order quantity
	pQuantity.textContent = userDoc.data().order_quantity;
	pQuantity.setAttribute("style", "vertical-align:middle");
	
	//Product total price
	pTotal.textContent = doc.data().prod_Price * userDoc.data().order_quantity;
	pTotal.setAttribute("style", "vertical-align:middle");
	
	tr.appendChild(tdImg);
	tr.appendChild(pName);
	tr.appendChild(pPrice);
	tr.appendChild(pQuantity);
	tr.appendChild(pTotal);
	tr.appendChild(pActions);
	cartList.appendChild(tr);
}

function removeFromDB(remove){
	remove.addEventListener("click", (e) =>{
		e.stopPropagation();
		let id = e.target.parentElement.parentElement.getAttribute("data-id");
		console.log(id);
		db.collection("users").doc(gUser.uid).collection("cartItem").doc(id).delete();
	});
}

function checkoit(){
	//Pass prodID, quantity, total price here
	checkout.addEventListener("click", (e) =>{
		e.stopPropagation();
		let pid = e.target.parentElement.parentElement.getAttribute("data-id");
		//cant get the value of quantity
		let pQuant = parseInt(e.target.parentElement.parentElement.childNodes[3].childNodes[0].value);
		let total = parseInt(e.target.parentElement.parentElement.childNodes[4].innerHTML);

		sessionStorage.setItem("cartProdID", pid);
		sessionStorage.setItem("cartProdQuant", pQuant);
		sessionStorage.setItem("cartTotal", total);

		window.open("http://localhost:5000/checkout.html")

		console.log(pid);
		console.log(pQuant);
		console.log(total);
	});
}