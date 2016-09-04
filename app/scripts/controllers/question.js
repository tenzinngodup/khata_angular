'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('QuestionCtrl', function ($scope,$http,CommonService,$cookies,API,Session,$sails) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
     // CommonService.getUserId($scope.currentUser.userId).then(function(response){
     //      $scope.author = response.data[0].id;
     //  });
  $scope.question = " ";

  CommonService.getQuestions().then(function(response){
  	$scope.questions = response.data;
  	console.log(response);
  });

//   var newSailsSocket = io.sails.connect();
//   io.socket.get(API + 'question', function (resData) {
//   console.log(resData);
//   resData; // => {id:9, name: 'Timmy Mendez'}
// });

// io.sails.url = API;

// io.socket.on('connect', function(){
//       io.socket.get('/questions');
//   });

//   io.socket.on('disconnect', function(){
//       console.log('Lost connection to server');
//   });

      // Using .success() and .error()
       (function () {
    $sails.get("questions")
      .success(function (data, status, headers, jwr) {
        console.log(data ) ;
      })
      .error(function (data, status, headers, jwr) {
        alert('Houston, we got a problem!');
      });

  }());

    $scope.createQuestion = function(){

    	var data = {"content": $scope.question};
    	// $http.post(API + 'question', data, config).success(function(){

    	// });
  		var url = API + 'question';
    	$http.post( url, {
	            data: data,
	            access_token:Session.id,
	            url:  API + 'question',
	            headers:{
	            	'Content-Type': 'application/json',
	            	"Authorization": 'Bearer '+ Session.id

	            }
	        }).then(function(response){

    		console.log(response);

    	});
	     //        $http.post(url, {        
      //     data:$scope.word,
      //     access_token:$window.sessionStorage.token,
      //     headers:{
      //         'Content-Type': 'application/json',
      //           // "Access-Control-Allow-Origin":"*",
      //       // 'access_token': $window.sessionStorage.token}
      //       "Authorization": 'Bearer '+ $window.sessionStorage.token}
      //   }
      // )

    	// CommonService.getQuestion($cookies.put('khata-fb-token'),data).then(function(error,response){

    	// 	console.log(response);

    	// });


    };





  });
