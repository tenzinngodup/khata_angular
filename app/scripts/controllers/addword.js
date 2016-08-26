'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:AddwordCtrl
 * @description
 * # AddwordCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('AddwordCtrl', function ($scope,$http,Upload,API,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.alerts = { "success": false , "message": "Null" };


   // $scope.createWord = function() {
	  // 	var data = $scope.word;
	  //  // $scope.greeting = 'Hello ' + $scope.username + '!';
	  //   $http.post(API+'create.php', data).success(function(){
	  //   	// $scope.wordlist.push($scope.word);
   //          $scope.alerts = { "success": true , "message": "Awesome! Your word has been submitted!" };

	  //   });

	  // };

    $scope.createWord = function(){
    var url = "http://localhost:1337/word";
    $http.post(url, {        
          data:$scope.word,
          headers:{
              'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin":"*",
            // 'access_token': $window.sessionStorage.token}
            "Authorization": 'Basic '+ $window.sessionStorage.token}
        }
      ).success(function(response){
        console.log(response);
        $scope.wordlist.push($scope.word);
        $scope.alerts = { "success": true , "message": "Awesome! Your word has been submitted!" };
      });
  }
  });
