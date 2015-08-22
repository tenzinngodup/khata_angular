'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('MainCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.likecount = 0;
     $scope.dislikecount = 0;

    
    $scope.autoGetWord = function(term) {
        return $http({
            method: 'POST', 
            url: 'http://khata.co/api/find.php',
            headers: {'Content-Type': 'application/json'},  
            data: { 'text' : term}
        }).
        then(function(response) {
             return response.data ;
        });


    };

	  $scope.searchEntered = false;

	$scope.searchText = function() {

        if($scope.searchword === null){
            $scope.noSearchFound= true;
            return false;
        }
        $scope.noSearchFound= false;
         $scope.$parent.bodyStyle ="{}";
         console.log($scope.bodyStyle);


        $http({
            method: 'POST', 
            url: 'http://khata.co/api/find.php',
            headers: {'Content-Type': 'application/json'},  
            data: { 'text' : $scope.searchword }
            //cache: $templateCache
        }).
        success(function(response) {
        	  $scope.searchEntered = true;
            $scope.wordlist = response ;

            console.log($scope.searchword );

        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;   
    };


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

    $scope.count = function() {

        $http({
            method: 'GET', 
            url: 'http://khata.co/api/count.php',
            headers: {'Content-Type': 'application/json'},  
            //cache: $templateCache
        }).
        success(function(response) {
          
            var data = response[0]["COUNT( * )"];
            $scope.countvalue = response[0]["COUNT( * )"];
         }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;   
    };


  });
