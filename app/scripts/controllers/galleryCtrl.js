'use strict';

angular.module('wanderaweApp')
  .controller('GalleryCtrl', ['$scope', 'Photo', 'GallerystorageService', function ($scope, Photo, GallerystorageService) {
    // the line below is for making sure that initial loading of GalleryCtrl will update $scope with pictures
    $scope.pictures = GallerystorageService.photos;

    $scope.$on('sentNavigationInfo', function (e) {
      $scope.pictures = GallerystorageService.photos; // array of objects that look like this: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    });

    $scope.setHeight = function (photoObj) {
      return Photo.resizePhotoHeight(photoObj) + '%';
    };
  }]);
