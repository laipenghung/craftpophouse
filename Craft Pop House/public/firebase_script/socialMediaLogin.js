var login = angular.module("loginModule", []);

login.controller("loginCtrl",
	function($scope){
		var provider = null;
		$scope.accType = function(accountType){
			if(accountType == "fb"){
				provider = new firebase.auth.FacebookAuthProvider();
			}
			else if(accountType == "google"){
				provider = new firebase.auth.GoogleAuthProvider();
			}
			signInAcc(provider);
		}
	}
);

function signInAcc(provider){
	firebase.auth().signInWithPopup(provider).then(function(result){
		//The user info object
		var user = result.user;
		console.log(user);
	}).catch(function(error){
		console.log("Error sign in with social media account");
	});
}


