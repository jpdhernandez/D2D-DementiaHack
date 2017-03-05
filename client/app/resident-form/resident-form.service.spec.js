'use strict';

describe('Service: residentForm', function() {
  // load the service's module
  beforeEach(module('d2DDementiaHackApp.resident-form'));

  // instantiate service
  var residentForm;
  beforeEach(inject(function(_residentForm_) {
    residentForm = _residentForm_;
  }));

  it('should do something', function() {
    expect(!!residentForm).to.be.true;
  });
});
