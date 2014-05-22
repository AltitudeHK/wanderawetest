'use strict';

angular.module('wanderaweApp')
  .factory('Gallerystorageservice', function Gallerystorageservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var svc = {};
    svc.photos = [];
    return svc;
  });
