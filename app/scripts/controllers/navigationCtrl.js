'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', 'Photo', 'GallerystorageService', function ($scope, Photo, GallerystorageService) {
    $scope.isSignedIn = false; // this should be false but leave true for now

    $scope.navigationInfo = {
      country: null,
      nature: false,
      culture: false,
      people: false
    };

    $scope.resetNavigationInfo = function () {
      // only reset nature, culture and people
      $scope.navigationInfo.nature = false;
      $scope.navigationInfo.culture = false;
      $scope.navigationInfo.people = false;
    };

    $scope.sendNavigationInfo = function (category) {
      $scope.resetNavigationInfo();
      if (category !== 'discover') {
        $scope.navigationInfo[category] = true;
      }
      Photo
        .retrieveAllPhotos($scope.navigationInfo)
        .success(function (photos) {
          console.log(category);
          GallerystorageService.photos = photos;
        });
    };
  }]);
