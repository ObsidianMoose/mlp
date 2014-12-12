//Controller for photo.html

angular.module("mlp.photo", ['ngFx']) //A simple way to add beautiful animations to your angular apps. Animations based off animate.css. 

.controller("photoController", function ($scope, Auth, PhotoFactory, PromptFactory, CommentFactory, $state) {
  Auth.isAuth();
  $scope.id = $state.params.id;
  $scope.userId = Auth.getUserId();
  $scope.email = Auth.getEmail();
  $scope.photo = {};
  $scope.submissionPeriodIsOpen = false;
  $scope.hideOverlay = true;
  $scope.commentText = '';
  $scope.comments = dummyComments;

  console.log('Email puppy Email puppy',$scope.email);

  $scope.setWinner = function () {
    PromptFactory.setPromptWinner($scope.photo.prompt_id, $scope.photo.id)
      .then(function (res) {
        $state.go('prompt', {
          id: $scope.photo.prompt_id
        });
      });
  };

  $scope.checkIfVotingPeriodIsOpen = function () {
    return ($scope.photo.prompt.votingEndTime > Date.now());
  };

  PhotoFactory.get($scope.id)
    .then(function (res) {
      $scope.photo = res.data;
      $scope.votingPeriodIsOpen = $scope.checkIfVotingPeriodIsOpen();
    });


  $scope.getComments = function(){
    CommentFactory.get()
      .then(function (res) {
        console.log('PuppiesAreBeautiful',res.data);
        $scope.comments = res.data;
      });
  };

  $scope.getComments();
  // console.log('PUPPIESPUPPIESPUPPIES',$scope.comments);
  
  $scope.sendComment = function(){
    var commentObj = {};
    commentObj['user_id'] = $scope.userId;
    commentObj['content'] = $scope.commentText;
    commentObj['photo_id'] = $scope.photo.id;
    commentObj['prompt_id'] = $scope.photo.prompt_id;
    commentObj['email'] = $scope.email;
    console.log(commentObj);
    $scope.commentText = '';
    CommentFactory.post(commentObj)
      .then(function (res) {
        console.log('WE GOT DATA', res.data);
        $scope.getComments();
      });
  };

  var dummyComments = [{
    author: "Dustin",
    text: "Looks like a dog."
  }, {
    author: "Brian",
    text: "The prompt was that you were supposed to get a picture of a Butterfinger bar."
  }, {
    author: "Loring",
    text: "This is stupid."
  }, {
    author: "Jorge",
    text: "I'm leaving this group....more like Silver Octo-loser."
  }, {
    author: "Loring",
    text: "Time to have fun."
  }, {
    author: "Loring",
    text: "Ok bye"
  }, {
    author: "Loring",
    text: "Time to have fun."
  }, {
    author: "Loring",
    text: "Ok bye"
  }];
  $scope.hideOverlay = true;

});