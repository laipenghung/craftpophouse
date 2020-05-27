var searchInput = document.getElementById("searchInput");

document.getElementById("searchForm").addEventListener("submit", function(event){
	event.preventDefault();
});

searchInput.addEventListener("keyup", function(e){
	if(e.keyCode == 13){
		search();
	}
});

function search(){
	console.log(searchInput.value);
	sessionStorage.setItem("searchValues", searchInput.value);
	sessionStorage.setItem("sequence", 1);
	window.location.href = "../products.html";
}
getProduct();
function getProduct(){
	var productRef = db.collection("Products");
	productRef.get().then(function(snapshot){
		snapshot.forEach(function(doc){
			var stringLow = doc.data().prod_Name.toLowerCase();
			var splitStr = stringLow.split(" ");
			var prodID = doc.data().prod_Id;
			productRef.doc(prodID).update({
				SEO: splitStr
			});
		});
	});
}