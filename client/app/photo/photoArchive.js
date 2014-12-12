angular.module("mlp.photoArchive", []) 

.controller("photoArchiveController", function ($scope, PhotoFactory, $state) {
  $scope.userPhotoArchive = PhotoFactory.userPhotoArchive.data;

  console.log('photos from photofactory!', $scope.userPhotoArchive);
});