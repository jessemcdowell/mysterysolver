'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
    var $scope;
    beforeEach(module('mysterysolver.controllers'));

    describe('HomeController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('HomeController', { $scope: $scope });
        }));


        it('should have an empty list of mysteries', inject(function() {
            expect($scope.mysteries.length).toBe(0);
        }));
    });
});
