'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.navigationInfo = {};
    $scope.isSignedIn = true; // this should be false but leave true for now

    $scope.resetNavigationInfo = function () {
      $scope.navigationInfo = {};
    };

    $scope.isDiscover = function () {
      // getPhoto
      $scope.resetNavigationInfo();
      $scope.navigationInfo = {
        country: null
      };

      console.log($scope.navigationInfo);
      $http
        .post('/getPhotos', $scope.navigationInfo)
        .success(function (res) {
          console.log(res);
        });
    };
  }]);
