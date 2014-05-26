'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', 'Photo', 'GallerystorageService', function ($scope, Photo, GallerystorageService) {
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
      Photo
        .retrieveAllPhotos($scope.navigationInfo)
        .success(function (photos) {

          console.log('Successfully sent navigationInfo in NavigationCtrl');
          console.log('Category:', category);
          console.log('Result is:', photos);
          GallerystorageService.photos = photos;
          // console.log('setting photos on success')
        });
    };
  }]);
