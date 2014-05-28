'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', '$state', 'photoService', function ($scope, $state, photoService) {
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
      if (category === 'discover') {
        photoService.retrieveAllPhotos({});
      } else {
        $scope.navigationInfo[category] = true;
        photoService.retrieveAllPhotos($scope.navigationInfo);
      }
    };
  }]);
