//Controller for suggestions.js makes sure the user is authorized to view and if not redirects them to the log in

angular.module("mlp.suggestions", ['ngFx'])

.controller("suggestionsController", function ($scope, Auth) {
  Auth.isAuth();
  $scope.categories = {
  	'Raunchy Office': ['RO1', 'RO2', 'RO3', 'RO4', 'RO5'],
  	'Sunday church friends': ['SCF1', 'SCF2', 'SCF3', 'SCF4', 'SCF5'],
  	'For kids': ['FK1', 'FK2', 'FK3', 'FK4', 'FK5'],
  	'Night at the club': ['NATC1', 'NATC2', 'NATC3', 'NATC4', 'NATC5']
  }
});