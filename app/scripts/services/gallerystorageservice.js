'use strict';

angular.module('wanderaweApp')
  .factory('GallerystorageService', function GallerystorageService() {
    var svc = {};
    svc.photos = [];
    return svc;
  });
