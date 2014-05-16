'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', '$upload', '$http', function ($scope, $upload, $http) {
    $scope.photoInfo = {};

    $scope.save = function () {
      $scope.photoInfo = {
        title: $scope.title,
        country: $scope.country,
        month: $scope.month,
        year: $scope.year,
        description: $scope.description
      };
      
      $http
        .post('/upload', $scope.photoInfo)
        .success(function (res) {
          console.log('Sent successfully');
        });
    };
    // $scope.onFileSelect = function($files) {
    //   //$files: an array of files selected, each file has name, size, and type.
    //   for (var i = 0; i < $files.length; i += 1) {
    //     var file = $files[i];
    //     $scope.upload = $upload.upload({
    //       url: '/upload', //upload.php script, node.js route, or servlet url
    //       method: 'POST',
    //       // headers: {'header-key': 'header-value'},
    //       // withCredentials: true,
    //       data: { myObj: $scope.myModelObj },
    //       file: file, // or list of files: $files for html5 only
    //       //set the file formData name ('Content-Desposition'). Default is 'file' 
    //       //fileFormDataName: myFile, //or a list of names for multiple files (html5).
    //       /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
    //       //formDataAppender: function(formData, key, val){}
    //     })
    //     .success(function(data, status, headers, config) {
    //       console.log(data);
    //     });
    //     //.error(...)
    //     //.then(success, error, progress); 
    //     //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    //   }
    // };

  }]);