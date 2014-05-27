'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', '$state', 'Photo', function ($scope, $state, Photo) {
    $scope.isSignedIn = false; // this should be false but leave true for now

    $scope.navigationInfo = {
      'country': null,
      'culture': false,
      'nature': false,
      'people': false
    };

    $scope.resetNavigationInfo = function () {
      // only reset nature, culture and people
      $scope.navigationInfo.culture = false;
      $scope.navigationInfo.nature = false;
      $scope.navigationInfo.people = false;
    };

    $scope.sendNavigationInfo = function (category) {
      $scope.resetNavigationInfo();
      if (category !== 'discover') {
        $scope.navigationInfo[category] = true;
      }
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };
  }]);
