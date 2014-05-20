'use strict';

angular.module('wanderaweApp')
  .service('Photo', ['$http', '$upload', '$state', function Photo($http, $upload, $state) {
    var lastUploadedFileType; // string
    var gridHeight = 300; // pixels

    this.uploadPhoto = function (photoInfo, file) {
      // $http.get('/auth/facebook', photoInfo)
      // $upload
      //   .upload({
      //     url: 'upload',
      //     data: photoInfo,
      //     file: file
      //   })
      //   .progress(function() {
      //     // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      //   })
      //   .success(function(res) {
      //     console.log('upload photo successfully');
      //     $state.go('singlephoto', res);
      //     lastUploadedFileType = res.fileType;
      //   });
    };

    this.getLastUploadedFileType = function () {
      return lastUploadedFileType;
    };

    this.retrieveOnePhoto = function (photoId) {
      $http
        .post('/getOnePhotos', {'photoId': photoId})
        .success(function (res) {
          console.log('retrieve one photo successfully');
          console.log(res);
        });
    };

    this.retrieveAllPhotos = function (navigationInfo) {
      return $http.post('/getPhotos', navigationInfo);
    };

    this.getPhotoHeight = function (photoObj) {
      // photoObj will be an object that looks like
      // { "name": "537acf591ba61f0000f8401d.jpeg", "height": 300, "width": 300 }
      return photoObj.height;
    };

    this.getPhotoWidth = function (photoObj) {
      return photoObj.width;
    };

    this.resizePhotoHeight = function (photoObj) {
      // check if photoObj height is less than gridHeight
      // if yes, don't do anything
      // else, return gridHeight
      return (photoObj.height > gridHeight) ? (gridHeight / photoObj.height) * 100 : 100;
    };
  }]);
