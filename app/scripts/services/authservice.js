'use strict';

/**
 * @ngdoc service
 * @name khataAngularApp.AuthService
 * @description
 * # AuthService
 * Service in the khataAngularApp.
 */
angular.module('khataAngularApp')
 //  .service('AuthService', function ($window,$q,$rootScope, $http) {
 //    // AngularJS will instantiate a singleton by calling "new" on this function
 //    return {
 //    	loginFacebook: function(user, callback) {
	//       var deferred = $q.defer(),
	//           cb = callback || angular.noop;
	//       console.log("here", user);
	//       $http.post('/login/facebook', user)
	//         .success(function(data) {
	//           $window.sessionStorage.token = data.token;
	//           console.log($window.sessionStorage.token);
	//           // Do something with the user here
	//           deferred.resolve(profile);
	//         })
	//         .error(function(data) {
	//           delete $window.sessionStorage.token;
	//           // Do something else here
	//           deferred.reject($rootScope.currentUser);
	//         });
	//       return deferred.promise;
	//     }
	// }
 //  });

.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post(API+'/login/facebook', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});
