'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('ContactCtrl', function ($scope,$http,API) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


   $scope.alerts = { "success": false , "message": "Null" };


   $scope.contactSubmit = function() {
	  	var data = $scope.contact;
	   // $scope.greeting = 'Hello ' + $scope.username + '!';
	    $http.post(API+'contact.php', data).success(function(){
	    	// $scope.wordlist.push($scope.word);
            $scope.alerts = { "success": true , "message": "Awesome! Your feedback has been submitted!" };


	    }).error(function() {
			   $scope.alerts = { "failure": true , "message": "Error submiting request!" };
			});

	  };
  });
