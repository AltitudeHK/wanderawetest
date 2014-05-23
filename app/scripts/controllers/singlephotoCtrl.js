'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', '$stateParams', 'Photo', function ($scope, $stateParams, Photo) {
    Photo
      .retrieveOnePhoto($stateParams.photoId)
      .success(function (data) {
        // data looks like: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
        $scope.photoPath = data.photoId + '.' + data.fileType;
      });
  }]);