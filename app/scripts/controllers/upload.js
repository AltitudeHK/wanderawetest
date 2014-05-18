'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', '$upload', '$http', function ($scope, $upload, $http) {
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
        $upload
          .upload({
            url: 'upload',
            data: $scope.photoInfo,
            file: $scope.file
          })
          .progress(function(evt) {
            // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          })
          .success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
          });
      }
    };

    $scope.onFileSelect = function($files) {
      $scope.file = $files[0];
    };
  }]);