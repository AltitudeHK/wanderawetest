'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', 'Photo', 'month', 'year', 'category', function ($scope, Photo, month, year, category) {
    $scope.photoInfo = {};
    $scope.months = month;
    $scope.years = year;
    $scope.categories = category;
    $scope.category = {
      'culture': false,
      'nature': false,
      'people': false
    };

    $scope.resetPhotoInfo = function () {
      $scope.photoInfo = {};
    };

    $scope.resetCategory = function () {
      $scope.category = {
        'culture': false,
        'nature': false,
        'people': false
      };
    };

    $scope.submitForm = function (isValid) {
      if (isValid) {
        $scope.category[$scope.selectedCategory] = true;
        $scope.photoInfo.category = $scope.category;
        Photo.uploadPhoto($scope.photoInfo, $scope.file);

        // reset
        $scope.resetPhotoInfo();
        $scope.resetCategory();
      }
    };

    $scope.onFileSelect = function($files) {
      $scope.file = $files[0];

      // http://stackoverflow.com/questions/12570834/how-to-preview-image-get-file-size-image-height-and-width-before-upload?lq=1
      var reader = new FileReader();
      var image = new Image();

      reader.readAsDataURL($scope.file);
      reader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
          // adding width and height manually
          $scope.photoInfo.width = this.width;
          $scope.photoInfo.height = this.height;
        };
      };
    };
  }]);
