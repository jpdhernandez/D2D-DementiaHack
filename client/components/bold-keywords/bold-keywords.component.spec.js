'use strict';

describe('Component: boldKeywords', function() {
  // load the component's module
  beforeEach(module('d2DDementiaHackApp.bold-keywords'));

  var boldKeywordsComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    boldKeywordsComponent = $componentController('boldKeywords', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
