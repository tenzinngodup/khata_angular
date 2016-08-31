'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('BodyCtrl', function ($scope,USER_ROLES,AuthService,AUTH_EVENTS,$location,$rootScope,$window,$uibModal, $log,ALERT_STATUS,$cookies,CommonService,API,$http,Session) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthService.isAuthorized;
      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
             // $scope.profileURL = "http://graph.facebook.com/"+ $scope.currentUser.userId+"/picture";
      };
      $scope.$on(AUTH_EVENTS.notAuthenticated, function(){
        // alert("not notAuthenticated");
        $scope.open('lg',"not notAuthenticated","Redirecting to login page." );
        $location.path('/login'); 
      });
      $scope.$on(AUTH_EVENTS.notAuthorized, function(){
        // alert("not notAuthorized");
       $scope.open('lg',"not notAuthorized","Redirecting to login page." );                
        $location.path('/login'); 
      });
      $scope.$on(ALERT_STATUS.addWord, function(){
        // alert("not notAuthorized");
       $scope.open('lg',"Word Added!","" );                
        // $location.path('/login'); 
      });

      $scope.isAuthenticated = function(){
        return AuthService.isAuthenticated();
      };
      $scope.logout = function(){
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        $cookies.remove('khata-fb-token');
        $window.location.reload();

      };

      if(!angular.isUndefined($cookies.get('khata-fb-token'))){
         // CommonService.getUserInfo($cookies.get('khata-fb-token')).success(function(response){
         //  console.log(response);
         //  alert(response);
         // });

          $http.post(API + 'user/token', {        
          data:[],
          access_token:$cookies.get('khata-fb-token'),
          headers:{
              'Content-Type': 'application/json',
            "Authorization": 'Bearer '+$cookies.get('khata-fb-token')}
        }
      ).success(function(response){
        Session.create($cookies.get('khata-fb-token'), response.facebookId,"editor",response.displayName);
        $scope.setCurrentUser(Session);
      });

      }


/////////////////////////////////////////////////////////////////////      
      $scope.items = ['item1', 'item2', 'item3'];
      $scope.header = "header content";
      $scope.content = " main body content";

      $scope.animationsEnabled = true;
      $scope.open = function (size,content,header) {
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              },
             header: function () {
                return header;
              },
              content: function () {
                return content;
              },

            }
        });
      };
//////////////////////////////////////////////////////////////////
  // $scope.image = "images/lakesky.jpg";

  // $scope.bodyStyle = {background: "url(" + $scope.image + ") no-repeat center center fixed",
  // "-webkit-background-size": "cover",
  // "-moz-background-size": "cover",
  // "-o-background-size": "cover",
  // "background-size": "cover",
  // };


  });

angular.module('khataAngularApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items, header,content,$scope) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };
  $scope.content = content; 
  $scope.header = header; 

  $scope.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


