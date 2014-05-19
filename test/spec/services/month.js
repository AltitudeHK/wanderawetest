'use strict';

describe('Service: month', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var month;
  beforeEach(inject(function (_month_) {
    month = _month_;
  }));

  it('should do something', function () {
    expect(!!month).toBe(true);
  });

});
