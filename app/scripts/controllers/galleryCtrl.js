'use strict';

angular.module('wanderaweApp')
  .controller('GalleryCtrl', ['$scope', 'photoService', 'gallerystorageService', function ($scope, photoService, gallerystorageService) {
    // the line below is for making sure that initial loading of GalleryCtrl will update $scope with pictures
    $scope.pictures = gallerystorageService.photos;

    $scope.$on('sentNavigationInfo', function (e) {
      $scope.pictures = gallerystorageService.photos; // array of objects that look like this: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    });

    $scope.setHeight = function (photoObj) {
      return photoService.resizePhotoHeight(photoObj) + '%';
    };
  }]);
