'use strict';

angular.module('wanderaweApp')
  .service('Photo', ['$http', '$upload', '$state', 'window', function Photo($http, $upload, $state, window) {
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

    
  }]);
