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

     $scope.styleChange = function(){
        $scope.searchEntered ='top-left';
    };

    $scope.imageChange= function(){
        var x = Math.floor((Math.random() * 9) );
        var imageLocal = [ "images/girl_tibet.jpg", 
        "images/Potala.jpg" ,
        "images/tibet-horseman.jpg" ,
        "images/Tibet_Everest.jpg",
         "images/scripture.jpg",
        "images/Compassion.jpg" ,
        "images/miyul.jpg" ,
        "images/omani-script.jpg",
        "images/nyingje.jpg"     ];
        $scope.imageLocation = imageLocal[x];
    }
    $scope.imageChange();

    
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


        $http({
            method: 'POST', 
            url: 'http://khata.co/api/find.php',
            headers: {'Content-Type': 'application/json'},  
            data: { 'text' : $scope.searchword }
            //cache: $templateCache
        }).
        success(function(response) {
        	  $scope.searchEntered = true;
              if(response=="No Result" || response.length == 0){
                $scope.noSearchFound = true;
              }
            $scope.wordlist = response ;

        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;   
    };

    $scope.cancel = function (index){
        $scope.wordlist[index].cancelling = true;
    }


	$scope.like = function(id,index) {

        $scope.cancel(index);
        $scope.wordlist[index].like = parseInt($scope.wordlist[index].like) +1;

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


	$scope.dislike = function(id,index) {

         $scope.cancel(index);
         $scope.wordlist[index].dislike = parseInt($scope.wordlist[index].dislike) +1;


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


    $scope.speak = function(val){

        var patt = /[^(]*/.exec(val);
      responsiveVoice.speak(patt[0]);

    };

    $scope.init = function(){
        $http({
            method: 'GET', 
            url: 'http://khata.co/api/mostliked10.php',
            headers: {'Content-Type': 'application/json'},  
            //cache: $templateCache
        }).
        success(function(response) {
            $scope.mostliked = response;
         }).
        error(function(response) {
        });
        $http({
            method: 'GET', 
            url: 'http://khata.co/api/recent10.php',
            headers: {'Content-Type': 'application/json'},  
            //cache: $templateCache
        }).
        success(function(response) {
            $scope.recent = response;
         }).
        error(function(response) {
        });


        // var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        // if(isFirefox){
        //     $scope.browserAlert = true;
        // }

    };

    $scope.init();



  });
