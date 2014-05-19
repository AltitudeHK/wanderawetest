'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', 'Photo', function ($scope, Photo) {
    $scope.photoInfo = {};

    $scope.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    $scope.years = [
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
      '2009',
      '2008',
      '2007',
      '2006',
      '2005',
      '2004',
      '2003',
      '2002',
      '2001',
      '2000'
    ];

    $scope.submitForm = function (isValid) {
      if (isValid) {
        Photo.uploadPhoto($scope.photoInfo, $scope.file);
      }
    };

    $scope.onFileSelect = function($files) {
      $scope.file = $files[0];
    };
  }]);