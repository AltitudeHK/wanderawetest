'use strict';

angular.module('wanderaweApp')
  .factory('Gallerystorageservice', function Gallerystorageservice() {
    var svc = {};
    svc.photos = [];
    return svc;
  });
