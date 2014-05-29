'use strict';

angular.module('wanderaweApp')
  .factory('gallerystorageService', function gallerystorageService() {
    var svc = {};
    svc.photos = [];
    return svc;
  });
