angular.module('starter')

.service('AuthService', function($q, $http) {
   var LOCAL_TOKEN_KEY1 = "Kwibohora";
   var LOCAL_TOKEN_KEY2 = "Kwibohora2";
   var LOCAL_TOKEN_KEY3 = "Kwibohora3";
   var STORE_QUESTION_ID = "Kwibohora4";
   var username = ""; // this will store the username
   var usercity = ""; // this will store the usercity
   var useremail = "";
   var questid = 0;
   var isAuthenticated = false;
   var authToken;
   var urlSender = "http://429ca024.ngrok.io";
   
   // checks if the user has already submitted the information
   
   function loadUserCredentials() {
   	var name = window.localStorage.getItem(LOCAL_TOKEN_KEY1);
   	var city = window.localStorage.getItem(LOCAL_TOKEN_KEY2);
   	if(name && city) {
   		useCredentials(name, city);
   	}
   }
 
   function storeUserCredentials(name, city, email) {
   	window.localStorage.setItem(LOCAL_TOKEN_KEY1, name);
   	window.localStorage.setItem(LOCAL_TOKEN_KEY2, city);
   	window.localStorage.setItem(LOCAL_TOKEN_KEY3, email);
   	useCredentials(name, city, email);
   }

   function useCredentials(name, city, email) {
   	 username = name;
   	 usercity = city;
   	 useremail = email;
     isAuthenticated = true;
     authToken = name;

     //$http.defaults.headers.common['X-Auth-Token'] = name;
   }
   function destroyUserCredentials(){
   	authToken = undefined;
   	username = "";
   	isAuthenticated = false;
   	$http.defaults.headers.common['X-Auth-Token'] = undefined;
   	window.localStorage.removeItem(LOCAL_TOKEN_KEY1);
   }
   var login = function(name, city, phone, email, profession, university, gender) {
        return $q(function(resolve, reject) {
              if((name == null) || (city == null) || (phone == null) || (email == null) || (profession == null)) {
              	console.log("please first fill all the fields");
              	reject('Login Failed.');
              }else{
              	var url = urlSender + '/users';
              	$http.post(url,{user_name:name, gender:gender, major:'testmajor', proffession:profession, school:university, email:email, cell:phone,  city_name:city}).
			        success(function(data,status,headers,config) {
			                console.log("the data are sent");
			        }).
			        error(function(data, status, headers, config) {
			          console.log("The data is not posted");
			        });
              	storeUserCredentials(name, city, email);
                console.log("it's working");
                resolve('login success.');
              }
        });
   };
  
   loadUserCredentials();


   //
   function InitialQuestionId(){
      window.localStorage.setItem(STORE_QUESTION_ID,questid);
   }
   function Quest(questionid) {
   	  questid = questionid;
      window.localStorage.setItem(STORE_QUESTION_ID,questid);
   }
   // return values and functions of the authentification service
   return {
   	login: login,
   	//isAuthorized: isAuthorized,
   	isAuthenticated: function() {return isAuthenticated;},
   	username: function() {return username;},
   	usercity: function() {return usercity;},
   	useremail: function() {return useremail;},
   	urlToSendTo: function() {return urlSender;},
   	questionId: function() {return questid;},
   	Quest: Quest
   };


});




  