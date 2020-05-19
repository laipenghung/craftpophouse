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