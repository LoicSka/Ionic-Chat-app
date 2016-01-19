angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})



// .controller('VotesCtrl',['$scope', '$http', function($scope, $http, $state, $ionicPopup) {
//   var url = 'http://0f23370d.ngrok.io/candidates.json';
//   $http.get(url).success(function(data){
//       $scope.canditates = data;  

//       $scope.doRefresh = function(){
//         $http.get(url).success(function(data){
//           $scope.candidates = data; 
//           $scope.$broadcast('scroll.refreshComplete');
//         });
//       }

      // $scope.sendVote = function(vote){
      // console.log("hey");
      // // var hasVoted = window.localStorage.getItem(LOCAL_TOKEN_KEY3);
      // // if( !has_voted ) {
      // //    var url = 'http://0f23370d.ngrok.io/votes';
      // //    $http.post(url, {user_id: 1, candidate_id: vote.value}).success(function() {
      // //        window.localStorage.setItem(LOCAL_TOKEN_KEY3, true);
      // //        $state.go('tab.dash');
      // //        var alertPopup = $ionicPopup.alert({
      //          title: 'Thank You!',
      //          template: 'Your vote has been sent.'
      //        });

      //       }).

      //       error(function(data) {
      //         // called asynchronously if an error occurs
      //         // or server returns response with an error status.
      //       });
//       // }
     
//       }
      
//    });
// }])

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