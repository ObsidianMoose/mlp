//Controller for suggestions.js makes sure the user is authorized to view and if not redirects them to the log in

angular.module("mlp.suggestions", ['ngFx'])

.controller("suggestionsController", function ($scope, SuggestionsFactory, Auth) {
  Auth.isAuth();
  $scope.categories = SuggestionsFactory.categories;
});