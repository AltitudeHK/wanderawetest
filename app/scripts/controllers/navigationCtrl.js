'use strict';

angular.module('wanderaweApp')
  .controller('NavigationCtrl', ['$scope', 'Photo', function ($scope, Photo) {
    $scope.isSignedIn = true; // this should be false but leave true for now

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

    $scope.isDiscover = function () {
      // Nature, Culture, and People should all be false
      // Country can be null or have a string value
      // Regardless of what navigationInfo is, should send this object to backend as is

      $scope.resetNavigationInfo();
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };

    $scope.isNature = function () {
      // User clicked on nature button; therefore, toggle nature to true
      $scope.resetNavigationInfo();
      $scope.navigationInfo.nature = true;
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };

    $scope.isCulture = function () {
      // User clicked on culture button; therefore, toggle culture to true
      $scope.resetNavigationInfo();
      $scope.navigationInfo.culture = true;
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };

    $scope.isPeople = function () {
      // User clicked on people button; therefore, toggle people to true
      $scope.resetNavigationInfo();
      $scope.navigationInfo.people = true;
      Photo.retrieveAllPhotos($scope.navigationInfo);
    };

  }]);
