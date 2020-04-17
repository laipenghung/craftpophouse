$.getScript("firebase_script/firebaseConfig.js", function(){});
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
		//Google access token, can use to access API
		var token = result.credential.accessToken;
		//The user info object
		var user = result.user;
	}).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		var credential = error.credential;
		console.log(errorCode+errorMessage+credential);
	});
}


