'use strict';

angular.module('wanderaweApp')
  .controller('LogoutCtrl', ['$rootScope', '$scope', '$http', '$cookieStore', function ($rootScope, $scope, $http, $cookieStore) {
    $cookieStore.remove('currentUser');
    $rootScope.$broadcast('loggedOut');
    // $http
    //   .post('/logout', {})
    //   .success(function (data) {
    //     console.log('within LogoutCtrl - cookieStore', $cookieStore.get('currentUser'));
    //     console.log('within LogoutCtrl', data);
    //     $cookieStore.remove('currentUser');
    //     $rootScope.$broadcast('loggedOut');
    //   });
  }]);
