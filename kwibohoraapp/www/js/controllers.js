angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}) 


.controller('MessageController', ['$scope', '$http', function($scope, $http) {
   var url = 'http://0f23370d.ngrok.io/messages.json';
   $http.get(url).success(function(data){
      $scope.messages = data;  

      $scope.getRandom = function(data){
        var x = data.toLowerCase();
        return x.charAt(0);
      }
     

      $scope.doRefresh = function(){
        $http.get(url).success(function(data){
          $scope.messages = data; 
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
      $scope.sendMessage = function(data){
        var url = 'http://0f23370d.ngrok.io/messages';
        $http.post(url, {body: data.message, user_id: 1, user_name: 'Chris Mutabazi',city_name: 'shanghai'}).
          success(function() {
            $http.get(url).success(function(obj){
            $scope.messages = obj;
            data.message = "";
          });
          }).

          error(function(data) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }
      
   });
}]);