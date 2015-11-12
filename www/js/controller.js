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

  $rootScope.stacks = [];

  $rootScope.stacks.push({size: 1, noodle: false, bin: false, rainbow: false});

  $scope.deleteStack = function(index) {
    $rootScope.stacks.splice(index, 1);
  }

  $scope.newStack = function() {
    $rootScope.stacks.push({size: 1, noodle: false, bin: false, rainbow: false});
  }

  $scope.upload = function() {
    var confirmPopup = $ionicPopup.confirm({
       title: 'Upload',
       template: 'Are you sure you want to upload the match? Double check that all your information is accurate.'
     });
     confirmPopup.then(function(res) {
       if(res) {

         $state.go('upload');

         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

}])

.controller('AutoCtrl', ['$scope', '$state', '$rootScope', '$ionicPopup', '$timeout', function($scope, $state, $rootScope, $ionicPopup, $timeout) {

  $scope.teleop = function() {
    $state.go('teleop');
  }

  $rootScope.auto = {speed: 0, stackSize: 0, bins: 0};

  $scope.toggle = "Start";

  var timeout = null;

  $scope.reset = function() {
    $rootScope.auto.speed = 0;
    $timeout.cancel(timeout);
  }

  $scope.onTimeout = function() {
       $rootScope.auto.speed++;
       timeout = $timeout($scope.onTimeout, 8.8);
   };

  $scope.startTimer = function() {

    if ($scope.toggle == "Stop") {
      $scope.toggle = "Start";
      $timeout.cancel(timeout);
    }
    else if ($scope.toggle == "Start") {
      timeout = $timeout($scope.onTimeout, 8.8);
      $scope.toggle = "Stop";
    }

  };

}])

.controller('ListCtrl', ['$scope', '$state', '$rootScope', '$ionicPlatform', '$ionicPopup', function($scope, $state, $rootScope, $ionicPlatform,$ionicPopup) {

}])

.controller('SearchCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {

}])

.controller('UploadCtrl', ['$scope', '$state', '$rootScope', '$http', '$window', function($scope, $state, $rootScope, $http, $window) {

  $scope.savedMatches = JSON.parse($window.localStorage['matches'] || '{}');
  $scope.savedAutos = JSON.parse($window.localStorage['autos'] || '{}');
  $scope.savedStacks = JSON.parse($window.localStorage['stacks'] || '{}');

  $scope.save = function() {

    $window.localStorage['matches'] = JSON.stringify($scope.savedMatches.push($rootScope.match));
    $window.localStorage['autos'] = JSON.stringify($scope.savedAutos.push($rootScope.auto));
    $window.localStorage['stacks'] = JSON.stringify($scope.savedAutos.push($rootScope.stacks));

    $rootScope.stacks = [];
    $rootScope.stacks.push({size: 1, noodle: false, bin: false, rainbow: false});
    $rootScope.match.number = $rootScope.match.number + 1;
    $rootScope.match.team = null;
    $rootScope.uploaded = "Previous match was recoreded. Thank you!";
    $state.go('newmatch');

  };

  $scope.upload = function() {

    $http.post('http://scoutingserver.herokuapp.com/api/matches/', {humanplayer: $rootScope.match.humanplayer, landfill: $rootScope.match.landfill, quadrant: $rootScope.match.quadrant, number: $rootScope.match.number, scouter: $rootScope.match.scouter, team: $rootScope.match.team, teleop: JSON.stringify($rootScope.stacks), auto: JSON.stringify($rootScope.auto), notes: $rootScope.match.notes})
        .success(function(data) {
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }
    );

    $rootScope.stacks = [];
    $rootScope.stacks.push({size: 1, noodle: false, bin: false, rainbow: false});
    $rootScope.match.number = $rootScope.match.number + 1;
    $rootScope.match.team = null;
    $rootScope.uploaded = "Previous match was uploaded. Thank you!";
    $state.go('newmatch');

  };

}])

.controller('SplashCtrl', ['$scope', '$state', function($scope, $state) {

  // goes to Confirm page

  $scope.next = function () {
    $state.go('confirm');
  };

}]);
