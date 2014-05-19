'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', 'Photo', 'month', 'year', function ($scope, Photo, month, year) {
    $scope.photoInfo = {};
    $scope.months = month;
    $scope.years = year;

    $scope.submitForm = function (isValid) {
      if (isValid) {
        Photo.uploadPhoto($scope.photoInfo, $scope.file);
      }
    };

    $scope.onFileSelect = function($files) {
      $scope.file = $files[0];
    };
  }]);