'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('ExploreCtrl', function ($scope,$http,API,CommonService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      $scope.totalItems = 64;
  $scope.currentPage = 4;

  	$scope.refresh = function(){
  	   CommonService.getExplore().then(function(response){
		   		$scope.words = response.data;
		  });
  	};


    $scope.init = function(){
		   CommonService.getExplore().then(function(response){
		   		$scope.words = response.data;
		  });
		   
        CommonService.getMostliked10().success(function(response){
                $scope.mostliked = response;
          }).error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });

        CommonService.getRecent10().success(function(response){
                $scope.recent = response;
          }).error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });

    };

    $scope.init();
  });
