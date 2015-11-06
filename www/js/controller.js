angular.module('starter.controllers', [])

.controller('ConfirmCtrl', ['$scope', '$state', function($scope, $state) {

  $scope.next = function () {
    $state.go('newmatch');
  };

}])

.controller('NewMatchCtrl', ['$scope', '$state', '$rootScope', '$ionicPopup', function($scope, $state, $rootScope, $ionicPopup) {

  $rootScope.match = {scouter: "", quadrant: "", team: "", number: ""};

  $scope.auto = function() {

    if ($rootScope.match.scouter == "" || $rootScope.match.quadrant == "" || $rootScope.match.team == "" || $rootScope.match.number == "" || $rootScope.match.scouter == null || $rootScope.match.quadrant == null || $rootScope.match.team == null || $rootScope.match.number == null)
    {
      var confirmPopup = $ionicPopup.confirm({
         title: 'Error',
         template: 'Fill out ALL of the fields to proceed.'
       });
       confirmPopup.then(function(res) {
         if(res) {
           console.log('You are sure');
         } else {
           console.log('You are not sure');
         }
       });
    }
    else {
      $state.go('auto');
    }
  }



}])

.controller('TeleopCtrl', ['$scope', '$state', '$ionicPopup', '$rootScope', '$http', function($scope, $state, $ionicPopup, $rootScope, $http) {

  $scope.stacks = [];

  $scope.stacks.push({size: 1, noodle: false, bin: false});

  $scope.deleteStack = function(index) {
    $scope.stacks.splice(index, 1);
  }

  $scope.newStack = function() {
    $scope.stacks.push({size: 1, noodle: false, bin: false, rainbow: false});
  }

  $scope.upload = function() {
    var confirmPopup = $ionicPopup.confirm({
       title: 'Upload',
       template: 'Are you sure you want to upload the match? Double check that all your information is accurate.'
     });
     confirmPopup.then(function(res) {
       if(res) {

         $http.post('http://scoutingserver.herokuapp.com/api/matches/', {quadrant: $rootScope.match.quadrant, number: $rootScope.match.number, scouter: $rootScope.match.scouter, team: $rootScope.match.team, teleop: JSON.stringify($scope.stacks), auto: JSON.stringify($rootScope.auto), notes: $rootScope.match.notes})
             .success(function(data) {
                 console.log(data);
             })
             .error(function(data) {
                 console.log('Error: ' + data);
             }
         );

         $scope.stacks = [];
         $scope.match.number = $scope.match.number + 1;
         $scope.match.team = null;
         $rootScope.uploaded = "Previous match was recoreded. Thank you!";
         $state.go('newmatch');

         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

}])

.controller('AutoCtrl', ['$scope', '$state', '$rootScope', '$ionicPopup', function($scope, $state, $rootScope, $ionicPopup) {

  $scope.teleop = function() {
    $state.go('teleop');
  }

  $rootScope.auto = {speed: 0, stackSize: 0, bins: 0};

}])

.controller('ListCtrl', ['$scope', '$state', '$rootScope', '$ionicPlatform', '$ionicPopup', function($scope, $state, $rootScope, $ionicPlatform,$ionicPopup) {

}])

.controller('SearchCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {

}])

.controller('SplashCtrl', ['$scope', '$state', function($scope, $state) {

  // goes to Confirm page

  $scope.next = function () {
    $state.go('confirm');
  };

}]);
