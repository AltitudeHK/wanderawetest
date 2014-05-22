'use strict';

describe('Service: Gallerystorageservice', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var Gallerystorageservice;
  beforeEach(inject(function (_Gallerystorageservice_) {
    Gallerystorageservice = _Gallerystorageservice_;
  }));

  it('should do something', function () {
    expect(!!Gallerystorageservice).toBe(true);
  });

});
