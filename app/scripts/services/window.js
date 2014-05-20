'use strict';

angular.module('wanderaweApp')
  .service('Window', function Window() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getWindowHeight = function () {
      return window.innerHeight;
    };

    this.getWindowWidth = function () {
      return window.innerWidth;
    };
  });
