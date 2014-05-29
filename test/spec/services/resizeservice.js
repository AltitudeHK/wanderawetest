'use strict';

describe('Service: resizeService', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var resizeService;
  beforeEach(inject(function (_resizeService_) {
    resizeService = _resizeService_;
  }));

  it('should do something', function () {
    expect(!!resizeService).toBe(true);
  });

});
