// angular.module('starter.services', [])

// .service('AuthServices', function($q, $http){
//   var LOCAL_TOKEN_KEY = 'yourTokenKey';
//   var user_name = '';
//   var role = '';
//   var authToken;
//     function loadUserCredentials() {
//     var name = window.localStorage.getItem(LOCAL_TOKEN_KEY1);
//     var city = window.localStorage.getItem(LOCAL_TOKEN_KEY2);
//     if(name && city) {
//       useCredentials(name, city);
//     }
//    };
//    function storeUserCredentials(name, city) {
//     window.localStorage.setItem(LOCAL_TOKEN_KEY1, name);
//     window.localStorage.setItem(LOCAL_TOKEN_KEY2, city);
//     useCredentials(name);
//    };

//    function useCredentials(name, city) {
//      username = name;
//      usercity = city;
//      isAuthenticated = true;
//      authToken = name;

//      // $http.defaults.headers.common['X-Auth-Token'] = name;
//    };
//    function destroyUserCredentials(){
//     authToken = undefined;
//     username = "";
//     isAuthenticated = false;
//     $http.defaults.headers.common['X-Auth-Token'] = undefined;
//     window.localStorage.removeItem(LOCAL_TOKEN_KEY1);
//    }
//    var login = function(name, city, phone, email, profession, university, gender) {
//         return $q(function(resolve, reject) {
//               if((name == null) || (city == null) || (phone == null) || (email == null) || (profession == null)) {
//                 console.log("please first fill all the fields");
//                 reject('Login Failed.');
//               }else{
//                 storeUserCredentials(name, city);
//                 console.log("it's working");
//                 resolve('login success.');
//               };
//         });
//    };
//    return {
//     login: login,
//     //isAuthorized: isAuthorized,
//     isAuthenticated: function() {return isAuthenticated;},
//     username: function() {return username;},
//     usercity: function() {return usercity;}
//    };
// })

// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//   },{
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
//   }];

//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
