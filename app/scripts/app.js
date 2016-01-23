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
  .config(function ($routeProvider, $locationProvider) {
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
        controllerAs: 'addWord'
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
      .otherwise({
        redirectTo: '/'
      });

      // $locationProvider.hashPrefix('!');

  });

angular.module('khataAngularApp').constant('API', "http://khata.co/api/");

