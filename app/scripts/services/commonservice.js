'use strict';

/**
 * @ngdoc service
 * @name khataAngularApp.CommonService
 * @description
 * # CommonService
 * Service in the khataAngularApp.
 */
angular.module('khataAngularApp')
  .service('CommonService', function ($http,API) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
    	getExplore: function(){
	    		return $http({
	            method: 'GET', 
	            url: API+"explore.php",
	            headers: {'Content-Type': 'application/json'},  
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;
	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
		getMostliked10: function(){
	    		return $http({
	            method: 'GET', 
	            url: API+"mostliked10.php",
	            headers: {'Content-Type': 'application/json'},  
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;
	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
		getRecent10: function(){
	    		return $http({
	            method: 'GET', 
	            url: API+"recent10.php",
	            headers: {'Content-Type': 'application/json'},  
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;
	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
		postLike: function(id){
	    	return $http({
	            method: 'POST', 
	            url: API+"like.php",
	            headers: {'Content-Type': 'application/json'}, 
	            data: { 'id' : id } 
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;
	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
	    postDislike: function(id){
	    	return $http({
	            method: 'POST', 
	            url: API+"dislike.php",
	            headers: {'Content-Type': 'application/json'}, 
	            data: { 'id' : id } 
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;
	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		}


    };

  });
