angular.module('starter')

.controller('AppCtrl', function($state, $scope, $ionicPopup, AuthService, AUTH_EVENTS) {

    $scope.username = AuthService.username();
    $scope.usercity = AuthService.usercity();
    $scope.useremail = AuthService.useremail();
    $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
       var alertPopup = $ionicPopup.alert({
          title: 'Unauthorized',
          template: 'You are not allowed to access this resource'
       });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
       $state.go('login');
       var alertPopup = $ionicPopup.alert({
          title: 'Session Lost',
          template: 'Sorry you have to login again.'
       });
    });

    $scope.setCurrentUsername = function(name) {
      // window.localStorage.setItem("Kwibohora1", name);
    	$scope.username = name;
    };
    $scope.setCurrentUsercity = function(city) {
      // window.localStorage.setItem("Kwibohora2", city);
    	$scope.usercity = city;
    };
    $scope.setCurrentUsercity = function(email) {
      // window.localStorage.setItem("Kwibohora2", city);
      $scope.useremail = email;
    };
 
})


.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup, AuthService) {
   $scope.data = {};

   $scope.login = function(data) {
    console.log('working');
   	AuthService.login(data.username, data.usercity, data.userphone, data.useremail, data.userprofession, data.useruniversity, data.usergender).then(function(authenticated) {
        $state.go('tab.home', {}, {reload: true});
        $scope.setCurrentUsername(data.username);
        $scope.setCurrentUsercity(data.usercity);
        $scope.setCurrentUseremail(data.useremail);
   	}, function(err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Failed!',
          template: 'Please check if you have filled all the required fields'
       });
   	});
   };
})



.controller('HomeCtrl', function($scope) {})

.controller('VotesCtrl', function($scope, $http, AuthService) {
  var url = AuthService.urlToSendTo() + '/candidates.json';
  $http.get(url).success(function(data){
      $scope.canditates = data;  

      $scope.doRefresh = function(){
        $http.get(url).success(function(data){
          $scope.candidates = data; 
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
      
   });
})

.controller('SurveyCtrl', function($scope, $http, $ionicPopup, AuthService) {
  $scope.questionid = AuthService.questionId();
  var url = AuthService.urlToSendTo() + '/questions.json';
if($scope.questionid == 0){
  $http.get(url).success(function(obj) {
     $scope.questions = obj;
      $scope.survey = $scope.questions[0];
      AuthService.Quest($scope.survey.id);
      $scope.questionid = AuthService.questionId();
      console.log($scope.questionid);
     }).
  error(function() {
    
  });
  }else{
      var i;
      var j;
      $http.get(url).success(function(obj) {
          $scope.questions = obj;
          for(i = 0; i < $scope.questions.length;i++){
            for(j = 0; j < $scope.questions[i].length;j++){
              if($scope.questions[j].id == $scope.questionid){
                continue;
              }else{
                $scope.survey = $scope.questions[j];
                AuthService.Quest($scope.survey.id);
                $scope.questionid = AuthService.questionId();
                console.log($scope.questionid);
              }
            }
      }
      }).
      error(function() {

      });
      
     }
  $scope.choice = {};
  $scope.SendSurvey = function(choice) {
     if(choice.answer === null || choice.answer === undefined){
          var alertPopup = $ionicPopup.alert({
          title: 'Error Message!',
          template: 'please give us an answer before submit!'
       });
     }else{
          answer = choice.answer;
          qustid = $scope.questionid;
          console.log(qustid);
          url = AuthService.urlToSendTo() + '/answers';
          $http.post(url, {question_id: qustid, content: answer}).
          success(function() {
              console.log('sent');
              var url = AuthService.urlToSendTo() + '/questions.json';
              $http.get(url).success(function(obj) {
                  $scope.questions = obj;
                  console.log("it's reaching here");
                  //console.log($scope.questions.length);
                  for(var i = 0; i < $scope.questions.length;i++){
                    console.log($scope.questions[0]);
                    for(var j = 0; j < $scope.questions[i].length;j++){
                      if($scope.questions[j].id == $scope.questionid){
                        console.log('yes');
                        continue;
                      }else{
                        $scope.survey = $scope.questions[j];
                        AuthService.Quest($scope.survey.id);
                        $scope.questionid = AuthService.questionId();
                        console.log($scope.questionid);
                      }
                    }
              }
              }).
              error(function() {

              });
          }).
          error(function() {
             console.log('notsent');
          });
         }
  };
})
.controller('MessageCtrl', function($scope, $http, AuthService) {
   var url = AuthService.urlToSendTo() + '/messages.json';
   $http.get(url).success(function(data){
      $scope.messages = data; 

      $scope.getRandom = function(data){
        var x = data.toLowerCase();
        return x.charAt(0);
      };
      
      $scope.doRefresh = function(){
        $http.get(url).success(function(data){
          $scope.messages = data; 
          $scope.$broadcast('scroll.refreshComplete');
          console.log("it's working");
        });
      };
      $scope.sendMessage = function(data){
        var url = AuthService.urlToSendTo() + '/messages';
        var username = AuthService.username();
        var cityname = AuthService.usercity();
        var useremail = AuthService.useremail();
        console.log(username);
        $http.post(url, {body: data.message, user_name: username, city_name: cityname, email: useremail}).
        success(function() {
          $http.get(url).success(function(obj) {
            $scope.messages = obj;
            data.message = "";
          });
        }).
        error(function(data) {
          console.log("message not sent");
        });
      };
      
   });
});