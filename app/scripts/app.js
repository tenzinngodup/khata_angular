'use strict';

/**
 * @ngdoc overview
 * @name khataAngularApp
 * @description
 * # khataAngularApp
 *
 * Main module of the application.
 */
angular
  .module('khataAngularApp', [
        'ngFacebook',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload',
    'ngCookies'
  ])
  .config(function ($routeProvider, $locationProvider,$facebookProvider,USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'

      })
      .when('/word/:wordId', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl',
        controllerAs: 'word'
      })
      .when('/grammer', {
        templateUrl: 'views/grammer.html'
      })
      .when('/community', {
        templateUrl: 'views/community.html'
      })
      .when('/names', {
        templateUrl: 'views/names.html'
      })
       .when('/colloquial', {
        templateUrl: 'views/colloquial.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/addWord', {
        templateUrl: 'views/addword.html',
        controller: 'AddwordCtrl',
        controllerAs: 'addWord',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/forum', {
        templateUrl: 'forum/index.php',
      })
      .when('/copyright', {
        templateUrl: 'views/copyright.html',
      })
      .when('/honorific', {
        templateUrl: 'views/honorific.html',
        controller: 'HonorificCtrl',
        controllerAs: 'honorific'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl',
        controllerAs: 'explore'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
        $facebookProvider.setAppId('1495326877435490');


      // $locationProvider.hashPrefix('!');

  })
.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})
.run(function ($rootScope, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
    if(typeof next.data != "undefined"){
       var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
    }

  });
});

// angular.module('khataAngularApp').constant('API', "http://khata-facebook-token-tenzinngodup.c9users.io:8080/")
angular.module('khataAngularApp').constant('API', "http://localhost:1337/")
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
.constant('ALERT_STATUS', {
  authLogin: 'auth-login-alert',
  addWord: 'add-word-alert'
});

