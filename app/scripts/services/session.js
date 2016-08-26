'use strict';

/**
 * @ngdoc service
 * @name khataAngularApp.Session
 * @description
 * # Session
 * Service in the khataAngularApp.
 */
angular.module('khataAngularApp')
  .service('Session', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  this.create = function (sessionId, userId, userRole,userDisplayName) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
    this.userDisplayName = userDisplayName;

  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
    this.userDisplayName = null;

  };
});
