'use strict';

describe('Controller: AddwordCtrl', function () {

  // load the controller's module
  beforeEach(module('khataAngularApp'));

  var AddwordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddwordCtrl = $controller('AddwordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddwordCtrl.awesomeThings.length).toBe(3);
  });
});
