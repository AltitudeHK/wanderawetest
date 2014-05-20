'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', '$stateParams', 'Photo', function ($scope, $stateParams, Photo) {
    $scope.photoId = $stateParams.photoId;
    // call server with photoId
    
    $scope.fileType = Photo.getLastUploadedFileType();
    // console.log('stateParams is', $stateParams);
  }]);