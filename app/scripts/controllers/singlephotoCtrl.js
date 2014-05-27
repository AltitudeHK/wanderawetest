'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', 'picture', '$window', function ($scope, picture, $window) {
    // picture: { "photoId": "537acf591ba61f0000f8401d", "fileType": "jpeg", "height": 300, "width": 300 }
    $scope.windowHeight = $window.innerHeight;
    $scope.windowWidth = $window.innerWidth;

    $scope.getScalingFactorHeight = function () {
      var windowHeight = $window.innerHeight;
      return parseInt(picture.data.height, 10) / windowHeight;
    };

    $scope.getScalingFactorWidth = function () {
      var windowWidth = $window.innerWidth;
      return parseInt(picture.data.width, 10) / windowWidth;
    };

    $scope.getFinalDimensions = function () {
      var heightRatio = $scope.getScalingFactorHeight();
      var widthRatio = $scope.getScalingFactorWidth();
      var finalWidth;
      var finalHeight;

      console.log('windowWidth', $window.innerWidth);
      console.log('windowHeight', $window.innerHeight);
      console.log('heightRatio', heightRatio);
      console.log('widthRatio', widthRatio);

      if (widthRatio > 1 || heightRatio > 1) {
        if (widthRatio >= heightRatio) {
          finalWidth = $window.innerWidth;
          finalHeight = parseInt(picture.data.height, 10) / widthRatio;
        } else {
          finalWidth = parseInt(picture.data.width, 10) / heightRatio;
          finalHeight = $window.innerHeight;
        }
      } else {
        finalWidth = parseInt(picture.data.width, 10);
        finalHeight = parseInt(picture.data.height, 10);
      }

      $scope.finalWidth = finalWidth;
      $scope.finalHeight = finalHeight;
    };

    console.log('picture is', picture);
    console.log('window is', $window);

    $scope.getFinalDimensions();
    $scope.photoPath = picture.data._id + '.' + picture.data.fileType;

    // $scope.$watch('windowWidth', function (e, a) {
    //   console.log('hi', e, a);
    //   $scope.getFinalDimensions();
    // });
  }]);