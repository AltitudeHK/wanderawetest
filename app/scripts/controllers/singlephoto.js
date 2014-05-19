'use strict';

angular.module('wanderaweApp')
  .controller('SinglephotoCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.photoId = $stateParams.photoId;
    // call server with photoId
    
    $scope.fileType = $stateParams.fileType;
    console.log('stateParams is', $stateParams);
  }]);