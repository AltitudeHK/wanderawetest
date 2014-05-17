'use strict';

angular.module('wanderaweApp')
  .controller('UploadCtrl', ['$scope', '$upload', '$http', function ($scope, $upload, $http) {
    $scope.photoInfo = {};

    var inputElement = document.getElementById('file');
    var handleFiles = function (evt) {
      var reader = new FileReader();
      var something = evt.target.files[0];

      reader.readAsBinaryString(something);
      
      reader.onload = function () {
        $scope.photoInfo.file = reader.result;
      };
    };

    inputElement.addEventListener('change', handleFiles, false);

    $scope.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    $scope.years = [
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
      '2009',
      '2008',
      '2007',
      '2006',
      '2005',
      '2004',
      '2003',
      '2002',
      '2001',
      '2000'
    ];

    $scope.submitForm = function (isValid) {
      if (isValid) {
        $http
          .post('/upload', $scope.photoInfo)
          .success(function (res) {
            console.log('Sent successfully', res);
            console.log($scope.photoInfo);

            // reset photoInfo (eventually redirect to full screen page with specific photoId)
            // $scope.photoInfo = {};
          });
        // $scope.upload();
      }
    };

    // $scope.onFileSelect = function($files) {
    //   //$files: an array of files selected, each file has name, size, and type.
    //   for (var i = 0; i < $files.length; i += 1) {
    //     var file = $files[i];
    //     // $scope.photoInfo.file = file;

    //     var fileReader = new FileReader();
    //     fileReader.readAsArrayBuffer(file);
    //     fileReader.onload = function (e) {
    //       var fileData = e.dataTransfer;
    //       $scope.upload = $upload.http({
    //         url: '/upload',
    //         method: 'POST',
    //         headers: {'Content-Type': file.type},
    //         // withCredentials: true,
    //         data: fileData
    //         // data: { myObj: $scope.myModelObj },
    //         // file: file // or list of files: $files for html5 only
    //         //set the file formData name ('Content-Desposition'). Default is 'file' 
    //         //fileFormDataName: myFile, //or a list of names for multiple files (html5).
    //         /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
    //         //formDataAppender: function(formData, key, val){}
    //       })
    //       .success(function(data, status, headers, config) {
    //         console.log('data', data);
    //       });

    //     //.error(...)
    //     //.then(success, error, progress); 
    //     //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    //     };
    //   }
    // };
  }]);