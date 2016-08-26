'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('UserCtrl', function ($scope,$window,Session,$http,API) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // this.user = $scope.user;
    $scope.user = $scope.currentUser; 

    $http.get( API + 'user?facebookId='+$scope.currentUser.userId).success(function(response){
    	console.log(response);
    	$http.get( API + 'word?author='+response[0].id).success(function(response){
    		console.log(response.length);
    		$scope.totalWord = response.length;
    		});
    });
    
  });
