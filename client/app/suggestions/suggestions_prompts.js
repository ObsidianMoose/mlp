//Controller for suggestions_prompts.  Checks to make sure the user is authorized to view page and if not redirects them to the loggin page.

angular.module("mlp.suggestions_prompts", ['ngFx'])

.controller("suggestionsPromptsController", function ($scope, SuggestionsFactory, $state, Auth) {
  Auth.isAuth();
  //hard coded suggestions

  $scope.categories = SuggestionsFactory.categories
  $scope.getAllSuggestions = function() {
    var result = [];
    for (category in $scope.categories) {
      var i = 0;
      while ($scope.categories[category][i]) {
        result.push($scope.categories[category][i])
        i++;
      }
    }
    return result;
  };
  $scope.suggestions = $scope.getAllSuggestions();
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