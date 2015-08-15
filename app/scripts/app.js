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
    'ui.bootstrap'
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
      .otherwise({
        redirectTo: '/'
      });
  });
