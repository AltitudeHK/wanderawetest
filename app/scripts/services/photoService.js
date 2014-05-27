'use strict';

angular.module('wanderaweApp')
  .factory('Photo', ['$rootScope', '$http', '$upload', '$state', '$cookieStore', 'GallerystorageService', function Photo($rootScope, $http, $upload, $state, $cookieStore, GallerystorageService) {
    var gridHeight = 300; // pixels

    var svc = {};
    svc.uploadPhoto = function (photoInfo, file) {
      console.log('within photo service, photoInfo is:', photoInfo);
      $upload
        .upload({
          url: 'upload',
          data: photoInfo,
          file: file
        })
        .success(function(data) {
          console.log('Successfully uploaded photo:', data);
          $state.go('singlephoto', data);
        });
    };

    svc.retrieveOnePhoto = function (photoId) {
      return $http.post('/getOnePhoto', {'photoId': photoId});
    };

    svc.retrieveAllPhotos = function (navigationInfo) {
      // console.log($cookieStore.get('currentUser'))
      $http
        .post('/getPhotos', navigationInfo)
        .success(function (photos) {
          // console.log('Successfully sent navigationInfo in NavigationCtrl');
          // console.log('navigationInfo:', navigationInfo);
          // console.log('Result is:', photos);
          GallerystorageService.photos = photos;
          $rootScope.$broadcast('sentNavigationInfo');
        });
    };

    svc.getPhotoHeight = function (photoObj) {
      // photoObj: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
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
