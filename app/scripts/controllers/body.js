'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('BodyCtrl', function ($scope,USER_ROLES,AuthService,AUTH_EVENTS,$location,$rootScope,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthService.isAuthorized;
      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
             // $scope.profileURL = "http://graph.facebook.com/"+ $scope.currentUser.userId+"/picture";
      };
      $scope.$on(AUTH_EVENTS.notAuthenticated, function(){
        alert("not notAuthenticated");
        $location.path('/login'); 
      });
      $scope.$on(AUTH_EVENTS.notAuthorized, function(){
        alert("not notAuthorized");
        $location.path('/login'); 
      })

      $scope.isAuthenticated = function(){
        return AuthService.isAuthenticated();
      };
      $scope.logout = function(){
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        $window.location.reload();

      };

  // $scope.image = "images/lakesky.jpg";

  // $scope.bodyStyle = {background: "url(" + $scope.image + ") no-repeat center center fixed",
  // "-webkit-background-size": "cover",
  // "-moz-background-size": "cover",
  // "-o-background-size": "cover",
  // "background-size": "cover",
  // };


  });

