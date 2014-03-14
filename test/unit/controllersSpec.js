'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
    beforeEach(module('mysterysolver.controllers'));

    describe('SetupController', function() {
        var $scope;
        var $location;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $location = angular.mock.$locationMock.$new();

            $controller('SetupController', { $scope: $scope, $location: $location });
        }));

        describe('start()', function() {
            beforeEach(function() {
                $scope.start();
            });

            it('should navigate to home', function() {
                expect($location.path()).toBe('/home');
            });
        });
    });

});
