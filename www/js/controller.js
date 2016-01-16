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

  $rootScope.defenseAttempts.push({defense: "", success: false, crossTime: 0, returnTime: 0, crossToggle: "Start", crossInterval: null, returnToggle: "Start", returnInterval: null});

  $scope.deleteAttempt = function(index) {
    $interval.cancel($rootScope.defenseAttempts[index].crossInterval);
    $interval.cancel($rootScope.defenseAttempts[index].returnInterval);
    $rootScope.defenseAttempts.splice(index, 1);
  }

  $scope.newAttempt = function() {
    $rootScope.defenseAttempts.push({defense: "", success: false, crossTime: 0, returnTime: 0, crossToggle: "Start", crossInterval: null, returnToggle: "Start", returnInterval: null});
  }

  $scope.resetCrossTimer = function(index) {
    $rootScope.defenseAttempts[index].crossTime = 0;
    $interval.cancel($rootScope.defenseAttempts[index].crossInterval);
    $rootScope.defenseAttempts[index].crossToggle = "Start";
  }

  $scope.startCrossTimer = function(index) {

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

.controller('UploadCtrl', ['$scope', '$state', '$rootScope', '$http', '$window', function($scope, $state, $rootScope, $http, $window) {

  $scope.upload = function() {

    $http.post('http://scoutingserver.herokuapp.com/api/matches/', {scouter: $rootScope.match.scouter,team: $rootScope.match.team,matchnumber: $rootScope.match.number,quadrant: $rootScope.match.quadrant,offensivebot: $rootScope.match.offensiveBot,defensivebot: $rootScope.match.defensiveBot,autonotes: $rootScope.match.autoNotes,auto: JSON.stringify($rootScope.auto),teleopnotes: $rootScope.match.teleopNotes,teleop: JSON.stringify($rootScope.teleop)})

        .success(function(data) {
            $rootScope.uploaded = "Previous match was uploaded. Thank you!";
        })
        .error(function(data) {
            $rootScope.uploaded = "Error...!";
        }
    );

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
    $state.go('newmatch');

  };

}])

.controller('SplashCtrl', ['$scope', '$state', function($scope, $state) {

  // goes to Confirm page

  $scope.next = function () {
    $state.go('confirm');
  };

}]);


/*
.directive('timer', ['$compile', function ($compile) {
    return  {
      restrict: 'EA',
      replace: false,
      scope: {
        interval: '=interval',
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime',
        countdownattr: '=countdown',
        finishCallback: '&finishCallback',
        autoStart: '&autoStart',
        language: '@?',
        fallback: '@?',
        maxTimeUnit: '=',
        seconds: '=?',
        minutes: '=?',
        hours: '=?',
        days: '=?',
        months: '=?',
        years: '=?',
        secondsS: '=?',
        minutesS: '=?',
        hoursS: '=?',
        daysS: '=?',
        monthsS: '=?',
        yearsS: '=?'
      },
      controller: ['$scope', '$element', '$attrs', '$timeout', 'I18nService', '$interpolate', 'progressBarService', function ($scope, $element, $attrs, $timeout, I18nService, $interpolate, progressBarService) {

        // Checking for trim function since IE8 doesn't have it
        // If not a function, create tirm with RegEx to mimic native trim
        if (typeof String.prototype.trim !== 'function') {
          String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
          };
        }

        //angular 1.2 doesn't support attributes ending in "-start", so we're
        //supporting both "autostart" and "auto-start" as a solution for
        //backward and forward compatibility.
        $scope.autoStart = $attrs.autoStart || $attrs.autostart;


        $scope.language = $scope.language || 'en';
        $scope.fallback = $scope.fallback || 'en';

        //allow to change the language of the directive while already launched
        $scope.$watch('language', function(newVal, oldVal) {
          if(newVal !== undefined) {
            i18nService.init(newVal, $scope.fallback);
          }
        });

        //init momentJS i18n, default english
        var i18nService = new I18nService();
        i18nService.init($scope.language, $scope.fallback);

        //progress bar
        $scope.displayProgressBar = 0;
        $scope.displayProgressActive = 'active'; //Bootstrap active effect for progress bar

        if ($element.html().trim().length === 0) {
          $element.append($compile('<span>' + $interpolate.startSymbol() + 'millis' + $interpolate.endSymbol() + '</span>')($scope));
        } else {
          $element.append($compile($element.contents())($scope));
        }

        $scope.startTime = null;
        $scope.endTime = null;
        $scope.timeoutId = null;
        $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
        $scope.isRunning = false;

        $scope.$on('timer-start', function () {
          $scope.start();
        });

        $scope.$on('timer-resume', function () {
          $scope.resume();
        });

        $scope.$on('timer-stop', function () {
          $scope.stop();
        });

        $scope.$on('timer-clear', function () {
          $scope.clear();
        });

        $scope.$on('timer-reset', function () {
          $scope.reset();
        });

        $scope.$on('timer-set-countdown', function (e, countdown) {
          $scope.countdown = countdown;
        });

        function resetTimeout() {
          if ($scope.timeoutId) {
            clearTimeout($scope.timeoutId);
          }
        }

        $scope.$watch('startTimeAttr', function(newValue, oldValue) {
          if (newValue !== oldValue && $scope.isRunning) {
            $scope.start();
          }
        });

        $scope.$watch('endTimeAttr', function(newValue, oldValue) {
          if (newValue !== oldValue && $scope.isRunning) {
            $scope.start();
          }
        });

        $scope.start = $element[0].start = function () {
          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
          if (!angular.isNumber($scope.countdown)) {
            $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          }
          resetTimeout();
          tick();
          $scope.isRunning = true;
        };

        $scope.resume = $element[0].resume = function () {
          resetTimeout();
          if ($scope.countdownattr) {
            $scope.countdown += 1;
          }
          $scope.startTime = moment().diff((moment($scope.stoppedTime).diff(moment($scope.startTime))));
          tick();
          $scope.isRunning = true;
        };

        $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
          var timeoutId = $scope.timeoutId;
          $scope.clear();
          $scope.$emit('timer-stopped', {timeoutId: timeoutId, millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days});
        };

        $scope.clear = $element[0].clear = function () {
          // same as stop but without the event being triggered
          $scope.stoppedTime = moment();
          resetTimeout();
          $scope.timeoutId = null;
          $scope.isRunning = false;
        };

        $scope.reset = $element[0].reset = function () {
          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
          $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          resetTimeout();
          tick();
          $scope.isRunning = false;
          $scope.clear();
        };

        $element.bind('$destroy', function () {
          resetTimeout();
          $scope.isRunning = false;
        });


        function calculateTimeUnits() {
          var timeUnits = {}; //will contains time with units

          if ($attrs.startTime !== undefined){
            $scope.millis = moment().diff(moment($scope.startTimeAttr));
          }

          timeUnits = i18nService.getTimeUnits($scope.millis);

          // compute time values based on maxTimeUnit specification
          if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'second') {
            $scope.seconds = Math.floor($scope.millis / 1000);
            $scope.minutes = 0;
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'minute') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor($scope.millis / 60000);
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'hour') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor($scope.millis / 3600000);
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'month') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'year') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
            $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
          }
          // plural - singular unit decision (old syntax, for backwards compatibility and English only, could be deprecated!)
          $scope.secondsS = ($scope.seconds === 1) ? '' : 's';
          $scope.minutesS = ($scope.minutes === 1) ? '' : 's';
          $scope.hoursS = ($scope.hours === 1) ? '' : 's';
          $scope.daysS = ($scope.days === 1)? '' : 's';
          $scope.monthsS = ($scope.months === 1)? '' : 's';
          $scope.yearsS = ($scope.years === 1)? '' : 's';


          // new plural-singular unit decision functions (for custom units and multilingual support)
          $scope.secondUnit = timeUnits.seconds;
          $scope.minuteUnit = timeUnits.minutes;
          $scope.hourUnit = timeUnits.hours;
          $scope.dayUnit = timeUnits.days;
          $scope.monthUnit = timeUnits.months;
          $scope.yearUnit = timeUnits.years;

          //add leading zero if number is smaller than 10
          $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
          $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
          $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
          $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
          $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
          $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

        }

        //determine initial values of time units and add AddSeconds functionality
        if ($scope.countdownattr) {
          $scope.millis = $scope.countdownattr * 1000;

          $scope.addCDSeconds = $element[0].addCDSeconds = function (extraSeconds) {
            $scope.countdown += extraSeconds;
            $scope.$digest();
            if (!$scope.isRunning) {
              $scope.start();
            }
          };

          $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
            $timeout(function () {
              $scope.addCDSeconds(extraSeconds);
            });
          });

          $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
            if (!$scope.isRunning) {
              $scope.clear();
            }

            $scope.countdown = countdownSeconds;
            $scope.millis = countdownSeconds * 1000;
            calculateTimeUnits();
          });
        } else {
          $scope.millis = 0;
        }
        calculateTimeUnits();

        var tick = function tick() {
          var typeTimer = null; // countdown or endTimeAttr
          $scope.millis = moment().diff($scope.startTime);
          var adjustment = $scope.millis % 1000;

          if ($scope.endTimeAttr) {
            typeTimer = $scope.endTimeAttr;
            $scope.millis = moment($scope.endTime).diff(moment());
            adjustment = $scope.interval - $scope.millis % 1000;
          }

          if ($scope.countdownattr) {
            typeTimer = $scope.countdownattr;
            $scope.millis = $scope.countdown * 1000;
          }

          if ($scope.millis < 0) {
            $scope.stop();
            $scope.millis = 0;
            calculateTimeUnits();
            if($scope.finishCallback) {
              $scope.$eval($scope.finishCallback);
            }
            return;
          }
          calculateTimeUnits();

          //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
          $scope.timeoutId = setTimeout(function () {
            tick();
            $scope.$digest();
          }, $scope.interval - adjustment);

          $scope.$emit('timer-tick', {timeoutId: $scope.timeoutId, millis: $scope.millis, timerElement: $element[0]});

          if ($scope.countdown > 0) {
            $scope.countdown--;
          }
          else if ($scope.countdown <= 0) {
            $scope.stop();
            if($scope.finishCallback) {
              $scope.$eval($scope.finishCallback);
            }
          }

          if(typeTimer !== null){
            //calculate progress bar
            $scope.progressBar = progressBarService.calculateProgressBar($scope.startTime, $scope.millis, $scope.endTime, $scope.countdownattr);

            if($scope.progressBar === 100){
              $scope.displayProgressActive = ''; //No more Bootstrap active effect
            }
          }
        };

        if ($scope.autoStart === undefined || $scope.autoStart === true) {
          $scope.start();
        }
      }]
    };
    }]);
*/
