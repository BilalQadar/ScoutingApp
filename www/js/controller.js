angular.module('starter.controllers', [])

.controller('ConfirmCtrl', ['$scope', '$state', function($scope, $state) {

  $scope.next = function () {
    $state.go('newmatch');
  };

}])

.controller('NewMatchCtrl', ['$scope', '$state', '$rootScope', '$ionicPopup', function($scope, $state, $rootScope, $ionicPopup) {

  $rootScope.match = {scouter: "", quadrant: "", team: "", number: "", autoNotes: "", teleopNotes: "", defensiveBot: false, offensiveBot: false};

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

.controller('TeleopCtrl', ['$scope', '$state', '$ionicPopup', '$rootScope', '$http', '$interval', function($scope, $state, $ionicPopup, $rootScope, $http, $interval) {

  $rootScope.teleop = {lowBall: 0, highBall: 0, challenge: false, scale: false}

  $scope.incLowBall = function() {
    $rootScope.teleop.lowBall++;
  }
  $scope.decLowBall = function() {
    if ($rootScope.teleop.lowBall>0)
    {
    $rootScope.teleop.lowBall--;
    }
  }
  $scope.incHighBall = function() {
    $rootScope.teleop.highBall++;
  }
  $scope.decHighBall = function() {
    if ($rootScope.teleop.highBall>0)
    {
    $rootScope.teleop.highBall--;
    }
  }

  $rootScope.defenseAttempts = [];

  $rootScope.defenseAttempts.push({defense: "", success: false, undamaged: false, crossTime: 0, returnTime: 0, crossToggle: "Start", crossInterval: null, returnToggle: "Start", returnInterval: null});

  $scope.deleteAttempt = function(index) {
    $interval.cancel($rootScope.defenseAttempts[index].crossInterval);
    $interval.cancel($rootScope.defenseAttempts[index].returnInterval);

    var crossOn = false;
    var returnOn = false;

    if ($rootScope.defenseAttempts[index+1])
    {

      if ($rootScope.defenseAttempts[index+1].crossToggle == "Stop")
      {
        crossOn = true;
        $interval.cancel($rootScope.defenseAttempts[index+1].crossInterval);
      }
      if ($rootScope.defenseAttempts[index+1].returnToggle == "Stop")
      {
        returnOn = true;
        $interval.cancel($rootScope.defenseAttempts[index+1].returnInterval);
      }

    }

    $rootScope.defenseAttempts.splice(index, 1);

    if (crossOn)
    {
      $rootScope.defenseAttempts[index].crossInterval = $interval(function(){$rootScope.defenseAttempts[index].crossTime++},10,0);
    }
    if (returnOn)
    {
      $rootScope.defenseAttempts[index].returnInterval = $interval(function(){$rootScope.defenseAttempts[index].returnTime++},10,0);
    }

    console.log($rootScope.defenseAttempts.length);
  }

  $scope.newAttempt = function() {
    $rootScope.defenseAttempts.push({defense: "", success: false, undamaged: false, crossTime: 0, returnTime: 0, crossToggle: "Start", crossInterval: null, returnToggle: "Start", returnInterval: null});
    console.log($rootScope.defenseAttempts.length);
  }

  $scope.resetCrossTimer = function(index) {
    console.log(index);
    $rootScope.defenseAttempts[index].crossTime = 0;
    $interval.cancel($rootScope.defenseAttempts[index].crossInterval);
    $rootScope.defenseAttempts[index].crossToggle = "Start";
  }

  $scope.startCrossTimer = function(index) {

    console.log(index);
    if ($rootScope.defenseAttempts[index].crossToggle == "Stop") {
      $rootScope.defenseAttempts[index].crossToggle = "Start";
      $interval.cancel($rootScope.defenseAttempts[index].crossInterval);
    }
    else if ($rootScope.defenseAttempts[index].crossToggle == "Start") {
      $rootScope.defenseAttempts[index].crossToggle = "Stop";
      $rootScope.defenseAttempts[index].crossInterval = $interval(function(){$rootScope.defenseAttempts[index].crossTime++},10,0);
    }
  };

  $scope.resetReturnTimer = function(index) {
    $rootScope.defenseAttempts[index].returnTime = 0;
    $interval.cancel($rootScope.defenseAttempts[index].returnInterval);
    $rootScope.defenseAttempts[index].returnToggle = "Start";
  }

  $scope.startReturnTimer = function(index) {

    if ($rootScope.defenseAttempts[index].returnToggle == "Stop") {
      $rootScope.defenseAttempts[index].returnToggle = "Start";
      $interval.cancel($rootScope.defenseAttempts[index].returnInterval);
    }
    else if ($rootScope.defenseAttempts[index].returnToggle == "Start") {
      $rootScope.defenseAttempts[index].returnToggle = "Stop";
      $rootScope.defenseAttempts[index].returnInterval = $interval(function(){$rootScope.defenseAttempts[index].returnTime++},10,0);
    }
  };


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

   $scope.teleopBack = function() {
     $state.go('auto')
   }

}])

.controller('AutoCtrl', ['$scope', '$state', '$rootScope', '$ionicPopup', '$timeout', function($scope, $state, $rootScope, $ionicPopup, $timeout) {

  $scope.teleop = function() {
    $state.go('teleop');
  }
  $scope.autoBack = function() {
    $state.go('newmatch')
  }

  $rootScope.auto = {speed: 0, lowBall: 0, highBall: 0};

  $scope.incAutoLowBall = function() {
    $rootScope.auto.lowBall++;
  }
  $scope.decAutoLowBall = function() {
    if ($rootScope.auto.lowBall>0)
    {
    $rootScope.auto.lowBall--;
    }
  }
  $scope.incAutoHighBall = function() {
    $rootScope.auto.highBall++;
  }
  $scope.decAutoHighBall = function() {
    if ($rootScope.auto.highBall>0)
    {
    $rootScope.auto.highBall--;
    }
  }


  $scope.toggle = "Start";

  var timeout = null;

  $scope.reset = function() {
    $rootScope.auto.speed = 0;
    $timeout.cancel(timeout);
  }

  $scope.onTimeout = function() {
       $rootScope.auto.speed++;
       timeout = $timeout($scope.onTimeout, 10);
   };

  $scope.startTimer = function() {

    if ($scope.toggle == "Stop") {
      $scope.toggle = "Start";
      $timeout.cancel(timeout);
    }
    else if ($scope.toggle == "Start") {
      timeout = $timeout($scope.onTimeout, 10);
      $scope.toggle = "Stop";
    }

  };

}])

.controller('ListCtrl', ['$scope', '$state', '$rootScope', '$ionicPlatform', '$ionicPopup', function($scope, $state, $rootScope, $ionicPlatform,$ionicPopup) {

}])

.controller('SearchCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {

}])

.controller('UploadCtrl', ['$scope', '$state', '$rootScope', '$http', '$window', '$ionicPopup', function($scope, $state, $rootScope, $http, $window, $ionicPopup) {

  var autoScore = 0;

  autoScore += ($rootScope.auto.lowBall*5) + ($rootScope.auto.highBall*10);

  if ($rootScope.auto.defenseCrossed)
  {
    autoScore += 10;
  }
  else if ($rootScope.auto.defenseReached)
  {
    autoScore += 2;
  }

  var teleopScore = 0;

  teleopScore += ($rootScope.teleop.lowBall*2) + ($rootScope.teleop.highBall*5);

  for (var i = 0; i<$rootScope.defenseAttempts.length; i++)
  {
    if ($rootScope.defenseAttempts[i].success && $rootScope.defenseAttempts[i].undamaged)
    {
      teleopScore += 5;
    }
  }

  if ($rootScope.teleop.scale)
  {
    teleopScore += 15;
  }
  else if ($rootScope.teleop.challenge)
  {
    teleopScore += 5;
  }

  $rootScope.totalScore = autoScore + teleopScore;


  $rootScope.auto.defenseAttack = "Failed";

  if ($rootScope.auto.defenseCrossed)
  {
    $rootScope.auto.defenseAttack = "Crossed";
  }
  else if ($rootScope.auto.defenseReached)
  {
    $rootScope.auto.defenseAttack = "Reached";
  }

  $rootScope.match.botType = "No input";

  if ($rootScope.match.defensiveBot && $rootScope.match.offensiveBot)
  {
    $rootScope.match.botType = "Hybrid";
  }
  else if ($rootScope.match.defensiveBot)
  {
    $rootScope.match.botType = "Defensive";
  }
  else if ($rootScope.match.offensiveBot)
  {
    $rootScope.match.botType = "Offensive";
  }

  $rootScope.teleop.towerAttack = "Failed";

  if ($rootScope.teleop.scale)
  {
    $rootScope.teleop.towerAttack = "Scaled";
  }
  else if ($rootScope.teleop.challenge)
  {
    $rootScope.teleop.towerAttack = "Challenged"
  }


  $scope.upload = function() {

    $http.post('http://scoutingserver.herokuapp.com/api/matches/', {scouter: $rootScope.match.scouter,team: $rootScope.match.team,number: $rootScope.match.number,quadrant: $rootScope.match.quadrant,offensivebot: $rootScope.match.offensiveBot,defensivebot: $rootScope.match.defensiveBot,botType: $rootScope.match.botType,autonotes: $rootScope.match.autoNotes,auto: JSON.stringify($rootScope.auto),teleopnotes: $rootScope.match.teleopNotes,teleop: JSON.stringify($rootScope.teleop),totalscore: $rootScope.totalScore})

        .success(function(data) {
            $rootScope.uploaded = "Previous match was uploaded. Thank you!";
            $rootScope.defenseAttempts = []
            $rootScope.defenseAttempts.push({defense: "", success: false, crossTime: 0, returnTime: 0, toggle: "Start"});
            $rootScope.match.number = $rootScope.match.number + 1;
            $rootScope.match.team = null;
            $rootScope.match.defensiveBot = false;
            $rootScope.match.offensiveBot = false;
            $rootScope.match.autoNotes = "";
            $rootScope.match.teleopNotes = "";
            $rootScope.auto.speed = 0;
            $rootScope.auto.lowBall = 0;
            $rootScope.auto.highBall = 0;
            $rootScope.auto.defenseCrossed = false;
            $rootScope.auto.defenseReached = false;
            $rootScope.auto.defenseType = "";
            $rootScope.teleop.lowBall = 0;
            $rootScope.teleop.highBall = 0;
            $rootScope.teleop.challenge = false;
            $rootScope.teleop.scale = false;

            $rootScope.totalScore = 0;

            $rootScope.auto.defenseAttack = "Failed";
            $rootScope.match.botType = "No input";
            $rootScope.teleop.towerAttack = "Failed";

            $state.go('newmatch');
            console.log('Success!')
        })
        .error(function(data) {
            $rootScope.uploaded = "Error...!";
            console.log('Error!');
            var confirmPopup = $ionicPopup.alert({
               title: 'Error!',
               template: 'Error! Please try again (Ensure that you have internet access).'
             });

        }
    );



  };

  $scope.returnTeleop = function() {
    $state.go('teleop');
  }

}])

.controller('SplashCtrl', ['$scope', '$state', function($scope, $state) {

  // goes to Confirm page

  $scope.next = function () {
    $state.go('confirm');
  };

}]);
