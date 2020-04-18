var compareTo = function() {
	return {
		require: "ngModel",
		scope:{
			otherModelValue: "=compareTo"
		},
		link: function(scope, e, a, ngModel){
			ngModel.$validators.compareTo = function(modelValue){
				return modelValue == scope.otherModelValue;
			}
			
			scope.$watch("otherModelValue", function(){
				ngModel.$validator();
			});
		}
	}
}

module.directive("compareTo", compareTo);