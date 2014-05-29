'use strict';

angular.module('wanderaweApp')
  .factory('userService', ['$state', '$rootScope', '$http', '$cookieStore', function ($state, $rootScope, $http, $cookieStore) {
    var access      = routingConfig.accessLevels,
        role        = routingConfig.userRoles,
        currentUser = $cookieStore.get('currentUser') || { username: '', role: role.public };

    return {
      isAuthorized: function (accessLevel, userRole) {
        currentUser = $cookieStore.get('currentUser') || { username: '', role: role.public };
        // console.log("currentUser cookieStore", $cookieStore.get('currentUser'));
        // console.log('isauthorised?', accessLevel, userRole, accessLevel <= userRole);
        return (accessLevel <= userRole);
      },

      isLoggedIn: function () {
        currentUser = $cookieStore.get('currentUser') || { username: '', role: role.public };
        // console.log('islogged in?', currentUser);
        return (currentUser.role >= role.user);
      }

        // signup: function (email, image, username, password) {
        //   var userInfo = {
        //     email: email,
        //     image: image,
        //     username: username,
        //     password: password,
        //     role: role.public
        //   };

        //   $http.post('/signup', userInfo)
        //     .success(function (res) { // res contains userInfo with updated role
        //       if (res === 'false') {  //signup failed
        //         $rootScope.$broadcast('invalidSignUp', 'the username you provided is already in use. please provide a new username to continue');
        //       } else {
        //         $state.go('map');
        //       }
        //     });

        // },

        // login: function (email, username, password) {
        //   var userInfo = {
        //     email: email,
        //     username: username,
        //     password: password,
        //     role: role.public
        //   };

        //   $http.post('/login', userInfo)
        //     .success(function (res) {
        //       if (res === '') {
        //         $rootScope.$broadcast('invalidLogIn', 'Username and password do not match or you do not have an account yet.');
        //       } else {
        //         $state.go('/');
        //       }
        //     });
            
        // },

        // logout: function () {
        //   $cookieStore.remove('currentUser');
        //   $cookieStore.put( 'currentUser', { role: 1 } );
        //   $state.go('/');
        // },

    };
  }]);

