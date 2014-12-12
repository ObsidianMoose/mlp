

angular.module("mlp.photoArchive", []) 

.controller("photoArchiveController", function ($scope, PhotoFactory, $state) {
  $scope.userPhotoArchive = PhotoFactory.userPhotoArchive;

  console.log($scope.userPhotoArchive);
});