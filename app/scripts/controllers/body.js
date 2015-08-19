'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('BodyCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.image="../../images/light-image.jpg";
  $scope.bodyStyle = {background: "url(" + $scope.image + ") no-repeat center center fixed",
  "-webkit-background-size": "cover",
  "-moz-background-size": "cover",
  "-o-background-size": "cover",
  "background-size": "cover"};


  });

