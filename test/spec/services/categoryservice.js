'use strict';

describe('Service: Categoryservice', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var Categoryservice;
  beforeEach(inject(function (_Categoryservice_) {
    Categoryservice = _Categoryservice_;
  }));

  it('should do something', function () {
    expect(!!Categoryservice).toBe(true);
  });

});
