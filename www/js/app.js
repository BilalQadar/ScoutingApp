// Scouting App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers', 'firebase'])

.run(function($ionicPlatform, $rootScope, $window) {
  $ionicPlatform.ready(function($scope, $rootScope) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });

  $rootScope.uploaded = "";

  $window.localStorage['matches'] = JSON.stringify([]);
  $window.localStorage['autos'] = JSON.stringify([]);

})


// Defining states of different views, and creating the reference to its .html file and URL

// state is the name of the state -> used when changing states
// url is the suffix to the server url
// templateUrl is the url of the html template
// controller is the reference to the controller in controller.js

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('splash', {
            url: '/splash',
            templateUrl: 'templates/splash.html',
            controller: 'SplashCtrl'
        })

        $stateProvider
            .state('confirm', {
                url: '/confirm',
                templateUrl: 'templates/confirm.html',
                controller: 'ConfirmCtrl'
            })

            $stateProvider
                .state('newmatch', {
                    url: '/newmatch',
                    templateUrl: 'templates/newmatch.html',
                    controller: 'NewMatchCtrl'
                })

                $stateProvider
                    .state('auto', {
                        url: '/auto',
                        templateUrl: 'templates/auto.html',
                        controller: 'AutoCtrl'
                    })

                    $stateProvider
                        .state('teleop', {
                            url: '/teleop',
                            templateUrl: 'templates/teleop.html',
                            controller: 'TeleopCtrl'
                        })

                       $stateProvider
                            .state('upload', {
                                url: '/upload',
                                templateUrl: 'templates/upload.html',
                                controller: 'UploadCtrl'
                            })


    // defaults URL/state to the splash screen (first screen)

    $urlRouterProvider.otherwise('/splash');
});
