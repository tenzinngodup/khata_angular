'use strict';

/**
 * @ngdoc function
 * @name khataAngularApp.controller:AddwordCtrl
 * @description
 * # AddwordCtrl
 * Controller of the khataAngularApp
 */
angular.module('khataAngularApp')
  .controller('AddwordCtrl', function ($scope,$http,Upload,API,$window,$rootScope,CommonService,ALERT_STATUS) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.alerts = { "success": false , "message": "Null" };


   // $scope.createWord = function() {
    //  var data = $scope.word;
    //  // $scope.greeting = 'Hello ' + $scope.username + '!';
    //   $http.post(API+'create.php', data).success(function(){
    //    // $scope.wordlist.push($scope.word);
   //          $scope.alerts = { "success": true , "message": "Awesome! Your word has been submitted!" };

    //   });

    // };

    $scope.foo = [{name: 'foo'}, {name: 'bar'}];
    $scope.tags = [
            { text: 'just' },
            { text: 'some' },
            { text: 'cool' },
            { text: 'tags' }
          ];

     $scope.loadTags = function(query) {
             return $http.get(API + "word?word=" + query);
          };
              

   CommonService.getUserId($scope.currentUser.userId).then(function(response){
          $scope.author = response.data[0].id;
      });

    $scope.createWord = function(){
    var url = API + "word";
    $scope.word.author = $scope.author;
    $http.post(url, {        
          data:$scope.word,
          access_token:$window.sessionStorage.token,
          headers:{
              'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin":"*",
            // 'access_token': $window.sessionStorage.token}
            "Authorization": 'Bearer '+ $window.sessionStorage.token}
        }
      ).success(function(response){
        console.log(response);
          $rootScope.$broadcast(ALERT_STATUS.addWord);
        $scope.word.word = null;
        $scope.word.english_word = null; 
            // $scope.alerts = { "success": true , "message": "Awesome! Your word has been submitted!" };
      });
  }
  });
