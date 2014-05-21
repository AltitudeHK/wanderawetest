'use strict';

describe('Service: Window', function () {

  // load the service's module
  beforeEach(module('wanderaweApp'));

  // instantiate service
  var Window;
  beforeEach(inject(function (_Window_) {
    Window = _Window_;
  }));

  it('should do something', function () {
    expect(!!Window).toBe(true);
  });

});
