//Contoroller for suggestions_prompts.  Checks to make sure the user is authorized to view page and if not redirects them to the loggin page.

angular.module("mlp.suggestions_prompts", ['ngFx'])

.controller("suggestionsPromptsController", function ($scope, $state, Auth) {
  Auth.isAuth();
  //hard coded suggestions
  $scope.suggestions = ['', 
  'suggestion2', 
  'suggestion3', 
  'suggestion4', 
  'suggestion5', 
  'suggestion6', 
  'suggestion7'];
  $scope.randomListGenerator = function(number) {
  	var result = [];
	var suggestions = $scope.suggestions.slice();
  	for (var i = 0; i < number; i++) {
  		var randomIndex = Math.floor(Math.random() * suggestions.length);
  		var randomSuggestion = suggestions.splice(randomIndex, 1)[0];
  		result.push(randomSuggestion);
  	};
  	return result;
  };
  $scope.randomList = $scope.randomListGenerator(4);
  $scope.exampleFunction = function(suggestion) {$scope.$parent.formData.title = suggestion};
  $scope.changeStateToSuggestions = function() {
  	$state.go('suggestions');
  };
});