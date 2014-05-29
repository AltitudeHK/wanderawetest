'use strict';

describe('Service: year', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var year;
  beforeEach(inject(function (_year_) {
    year = _year_;
  }));

  it('should do something', function () {
    expect(!!year).toBe(true);
  });

});
