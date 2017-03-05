'use strict';

describe('Component: ResidentFormComponent', function() {
  // load the controller's module
  beforeEach(module('d2DDementiaHackApp.resident-form'));

  var ResidentFormComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ResidentFormComponent = $componentController('resident-form', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
