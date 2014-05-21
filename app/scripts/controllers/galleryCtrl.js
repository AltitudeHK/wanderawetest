'use strict';

angular.module('wanderaweApp')
  .controller('GalleryCtrl', ['$scope', 'Photo', function ($scope, Photo) {
    $scope.pictures = []; // array of objects that look like this: { "name": "537acf591ba61f0000f8401d.jpeg", "height": 300, "width": 300 }

    $scope.setHeight = function (photoObj) {
      return Photo.resizePhotoHeight(photoObj) + '%';
    };

    // array of photos from server / database that have already been filtered by criteria ('Nature in China')
    Photo.retrieveAllPhotos({}).success(function (res) {
      console.log('retrieve all photos successfully');
      console.log(res);
      $scope.pictures = res;
    });

    // execute immediately to add functionality to each photo
    // $scope.photos.forEach(function (photo) {
      // add on-hover functionality to photo; this includes displaying appropriate info

      // add ability to like photo

      // check if the current state is 'logged in'
        // check if the current username is the username that belongs to the photo
          // add ability to remove photo
    // });

  }]);
