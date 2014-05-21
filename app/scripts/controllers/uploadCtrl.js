'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', 'Photo', 'month', 'year', function ($scope, Photo, month, year) {
    $scope.photoInfo = {};
    console.log('before')
    $scope.months = month;
    console.log('after')

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
