'use strict';

angular.module('wanderaweApp')
  .controller('GalleryCtrl', ['$scope', 'photoService', 'resizeService', 'gallerystorageService', function ($scope, photoService, resizeService, gallerystorageService) {
    // the line below is for making sure that initial loading of GalleryCtrl will update $scope with pictures
    // $scope.gridHeight = 300;
    // $scope.gridWidth = 300;
    $scope.pictures = gallerystorageService.photos;

    $scope.$on('sentNavigationInfo', function (e) {
      $scope.pictures = gallerystorageService.photos; // array of objects that look like this: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    });

    // $scope.getPhotoHeight = photoService.getPhotoHeight;
    // $scope.getPhotoWidth = photoService.getPhotoWidth;

    // $scope.getFinalDimensions = function (height, width) {
    //   var obj = resizeService.getFinalDimensions(height, width, $scope.gridHeight, $scope.gridWidth);
    //   $scope.finalWidth = obj.width;
    //   $scope.finalHeight = obj.height;
    // };

    // $scope.getFinalDimensions();
    // $scope.setHeight = function (photoObj) {
    //   return photoService.resizePhotoHeight(photoObj) + '%';
    // };
  }]);
