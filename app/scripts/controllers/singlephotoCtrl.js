'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', 'picture', '$window', 'resizeService', function ($scope, picture, $window, resizeService) {
    // picture: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    
    // bind on resize event of window
    angular.element($window).bind('resize', function () {
      $scope.getFinalDimensions();
      $scope.$apply();
    });

    $scope.getFinalDimensions = function () {
      var obj = resizeService.getFinalDimensions(picture.data.height, picture.data.width, $window.innerHeight, $window.innerWidth);
      $scope.finalWidth = obj.width;
      $scope.finalHeight = obj.height;
    };

    $scope.getFinalDimensions();
    $scope.photoPath = picture.data._id + '.' + picture.data.fileType;
  }]);