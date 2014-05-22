'use strict';

angular.module('wanderaweApp')
  .factory('Photo', ['$http', '$upload', '$state', '$cookieStore', function Photo($http, $upload, $state, $cookieStore) {
    var lastUploadedFileType; // string
    var gridHeight = 300; // pixels

    var svc = {};
    svc.uploadPhoto = function (photoInfo, file) {
      $upload
        .upload({
          url: 'upload',
          data: photoInfo,
          file: file
        })
        .progress(function() {
          // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        })
        .success(function(res) {
          console.log('upload photo successfully');
          $state.go('singlephoto', res);
          lastUploadedFileType = res.fileType;
        });
    };

    svc.getLastUploadedFileType = function () {
      return lastUploadedFileType;
    };

    svc.retrieveOnePhoto = function (photoId) {
      $http
        .post('/getOnePhotos', {'photoId': photoId})
        .success(function (res) {
          console.log('retrieve one photo successfully');
          console.log(res);
        });
    };

    svc.retrieveAllPhotos = function (navigationInfo) {
      // console.log($cookieStore.get('currentUser'))
      return $http.post('/getPhotos', navigationInfo);
      // $http
      //   .post('/getPhotos', navigationInfo)
      //   .success(function (res) {
          
      //   });
    };

    svc.getPhotoHeight = function (photoObj) {
      // photoObj will be an object that looks like
      // { "name": "537acf591ba61f0000f8401d.jpeg", "height": 300, "width": 300 }
      return photoObj.height;
    };

    svc.getPhotoWidth = function (photoObj) {
      return photoObj.width;
    };

    svc.resizePhotoHeight = function (photoObj) {
      // check if photoObj height is less than gridHeight
      // if yes, don't do anything
      // else, return gridHeight
      return (photoObj.height > gridHeight) ? (gridHeight / photoObj.height) * 100 : 100;
    };

    return svc;
  }]);
