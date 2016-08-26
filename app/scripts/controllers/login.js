'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('LoginCtrl', function ( $facebook,$scope,$location,$window,$http,AUTH_EVENTS, AuthService,Session,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loginFacebook = function() {
		  $facebook.login(['email']).then(function(response) {
			  	$window.sessionStorage.token = response.authResponse.accessToken;
			  	console.log($window.sessionStorage.token );
			  	 $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			    $scope.me();
		  	},
		  	function(response) {
		  		 $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		    	  console.log("Error!", response);
		  	});

		  // AuthService.login(credentials).then(function (user) {
		  //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		  //     $scope.setCurrentUser(user);
		  //   }, function () {
		  //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		  //   });
	};
	$scope.me = function() {
	  $facebook.api('/me', {fields: 'id, name, email'}).then(function(response) {
			Session.create($window.sessionStorage.token, response.id,"editor",response.name);
			 $scope.setCurrentUser(Session);
			 $location.path('/user'); 
		});
	};
	  // function refresh() {
	  //   $facebook.api("/me").then( 
	  //     function(response) {
	  //       $scope.welcomeMsg = "Welcome " + response.name;
	  //       $scope.isLoggedIn = true;
	  //     },
	  //     function(err) {
	  //       $scope.welcomeMsg = "Please log in";
	  //     });
	  // }


  });
