'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('QuestionCtrl', function ($scope,$http,CommonService,$cookies,API) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     // CommonService.getUserId($scope.currentUser.userId).then(function(response){
     //      $scope.author = response.data[0].id;
     //  });

    $scope.createQuestion = function(){

    	var data = {"content": $scope.question};
    	// $http.post(API + 'question', data, config).success(function(){

    	// });
    	$http({
	            method: 'POST', 
	            data: data,
	            access_token:$cookies.get('khata-fb-token'),
	            url:  API + 'question',
	            headers:{
	            	'Content-Type': 'application/json',
	            	"Authorization": 'Bearer '+ $cookies.get('khata-fb-token')

	            }
	        }).then(function(error,response){

    		console.log(response);

    	});

    	// CommonService.getQuestion($cookies.put('khata-fb-token'),data).then(function(error,response){

    	// 	console.log(response);

    	// });


    };





  });
