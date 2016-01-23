'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:WordCtrl
 * @description
 * # WordCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('WordCtrl', function ($routeParams,$scope,$http,API) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var data ={ 'id': $routeParams.wordId} ;
    $http.post(API+'find_image.php', data).success(function(response){
				$scope.word = response[0];
   		});


    $scope.cancel = function (){
        $scope.word.cancelling = true;
    };

    $scope.speak = function(val){
              var patt = /[^(]*/.exec(val);
      responsiveVoice.speak(patt[0]);

    };

  $scope.like = function(id) {


        $scope.cancel();
        $scope.word.like = parseInt($scope.word.like) +1;

        $http({
            method: 'POST', 
            url: API+'like.php',
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

           $scope.cancel();
        $scope.word.dislike = parseInt($scope.word.dislike) +1;

        $http({
            method: 'POST', 
            url: API+'dislike.php',
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
