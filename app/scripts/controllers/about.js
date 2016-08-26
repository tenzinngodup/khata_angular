'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('AboutCtrl', function ($scope,$http,API) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
     $scope.alerts = { "success": false , "message": "Null" };

   $scope.createWord = function() {
	  	var data = $scope.word;
	   // $scope.greeting = 'Hello ' + $scope.username + '!';
	    $http.post(API+'create.php', data).success(function(){
	    	// $scope.wordlist.push($scope.word);
            $scope.alerts = { "success": true , "message": "Awesome! Your word has been submitted!" };

	    });

	  };
  });
