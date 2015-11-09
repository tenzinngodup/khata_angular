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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload'
  ])
  .config(function ($routeProvider) {
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
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/addWord', {
        templateUrl: 'views/addword.html',
        controller: 'AddwordCtrl',
        controllerAs: 'addWord'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
