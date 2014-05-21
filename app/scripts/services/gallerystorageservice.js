'use strict';

angular.module('wanderaweApp')
  .service('Gallerystorageservice', function Gallerystorageservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.photos = [];
  });
