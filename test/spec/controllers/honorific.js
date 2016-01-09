'use strict';

describe('Controller: HonorificCtrl', function () {

  // load the controller's module
  beforeEach(module('khataAngularApp'));

  var HonorificCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HonorificCtrl = $controller('HonorificCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HonorificCtrl.awesomeThings.length).toBe(3);
  });
});
