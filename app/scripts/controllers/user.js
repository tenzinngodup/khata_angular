'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('UserCtrl', function ($scope,$window,Session) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // this.user = $scope.user;
    $scope.user = $scope.currentUser; 
    
  });
