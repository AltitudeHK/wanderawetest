'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', 'picture', function ($scope, picture) {
    // picture: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    $scope.photoPath = picture.photoId + '.' + picture.fileType;
  }]);