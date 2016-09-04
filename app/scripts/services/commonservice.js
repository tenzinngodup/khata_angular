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
	            url: API+"word?limit=10",
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
	            url: API+"word?sort=like DESC&limit=10",
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
	            url: API+"word?sort=createdAt DESC&limit=10",
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
		},
		getUserId: function(id){
	    	return $http({
	            method: 'GET', 
	            url:  API + 'user?facebookId='+id,
	            //cache: $templateCache
	        }).
	        success(function(response) {
	            return response;	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
		getUserInfo: function(token){
	    	return $http({
	            method: 'POST', 
	            data:[],
	            access_token:token,
	            url:  API + 'user/token',
	            headers:{
	            	'Content-Type': 'application/json',
	            	"Authorization": 'Bearer '+ token

	            	// access_token:token

	            }
	        }).
	        success(function(response) {
	            return response;	            
	         }).
	        error(function(error) {
	        	return error;
	        });
		},
		getQuestions: function(){
	         return $http({
	            method: 'GET', 
	            url:  API + 'question'
	        }).success(function(response) {
	            return response;	            
	         }).
	        error(function(error) {
	        	return error;
	        });;
		}


    };

  });
