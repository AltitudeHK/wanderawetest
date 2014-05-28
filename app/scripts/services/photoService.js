'use strict';

angular.module('wanderaweApp')
  .factory('photoService', ['$rootScope', '$http', '$upload', '$state', '$cookieStore', 'gallerystorageService', function photoService($rootScope, $http, $upload, $state, $cookieStore, gallerystorageService) {
    // var gridHeight = 400; // pixels

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
          $state.go('singlephoto', data);
        })
        .error(function(msg) {
          $state.go('login');
          alert(msg);
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
          // console.log('navigationInfo:', navigationInfo);
          // console.log('Result is:', photos);
          gallerystorageService.photos = photos;
          $rootScope.$broadcast('sentNavigationInfo');
        });
    };

    svc.getPhotoHeight = function (photoObj) {
      // photoObj: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
      return parseInt(photoObj.height, 10);
    };

    svc.getPhotoWidth = function (photoObj) {
      return parseInt(photoObj.width, 10);
    };

    svc.resizePhotoHeight = function (photoObj) {
      var percent;

      if (svc.getPhotoHeight(photoObj) > gridHeight) {
        percent = (gridHeight / svc.getPhotoHeight(photoObj)) * 100;
      } else {
        percent = 100;
      }
      console.log('percent is', percent);
      return percent;
    };

    return svc;
  }]);
