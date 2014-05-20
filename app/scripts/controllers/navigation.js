'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', 'Photo', function ($scope, Photo) {
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
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };
  }]);
