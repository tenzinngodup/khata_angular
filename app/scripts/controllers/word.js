'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:WordCtrl
 * @description
 * # WordCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('WordCtrl', function ($routeParams,$scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var data ={ 'id': $routeParams.wordId} ;
    $http.post('http://khata.co/api/index.php', data).success(function(response){
				$scope.word = response[0];
   		});


    

  $scope.like = function(id) {

        $http({
            method: 'POST', 
            url: 'http://khata.co/api/like.php',
            headers: {'Content-Type': 'application/json'},  
            data: { 'id' : id }
            //cache: $templateCache
        }).
        success(function(response) {
             console.log( response);

        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;   
    };


  $scope.dislike = function(id) {

        $http({
            method: 'POST', 
            url: 'http://khata.co/api/dislike.php',
            headers: {'Content-Type': 'application/json'},  
            data: { 'id' : id }
            //cache: $templateCache
        }).
        success(function(response) {
             console.log( response);


        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;   
    };
  });
