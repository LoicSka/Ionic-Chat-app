// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMockE2E'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config( ['$compileProvider',function( $compileProvider ){ 
         $compileProvider.imgSrcSanitizationWhitelist('/img');
       }
     ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tab', {
    url:'/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.chats', {
    url: '/chats',
    views : {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'MessageCtrl'
      }
    }
  })

  .state('tab.survey', {
    url: '/survey',
    views : {
      'tab-survey': {
        templateUrl: 'templates/tab-survey.html',
        controller: 'SurveyCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('tab/home');

})
.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
       
       if(!AuthService.isAuthenticated()) {
        if(next.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
       }
  });
})

.run(function($httpBackend) {
  $httpBackend.whenGET(/.*/).passThrough();
  $httpBackend.whenPOST(/.*/).passThrough();
});

