'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
    beforeEach(module('mysterysolver.controllers'));

    describe('HomeController', function() {
        var $scope;
        var $location;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $location = angular.mock.$locationMock.$new();

            $controller('HomeController', { $scope: $scope, $location: $location });
        }));


        it('should start with an empty list of mysteries', inject(function() {
            expect($scope.mysteries.length).toBe(0);
        }));

        describe('createNew()', function() {
            beforeEach(function() {
                $scope.createNew();
            });

            it('should add a mystery', function() {
                expect($scope.mysteries.length).toBe(1);
            });

            it('should navigate to view2,', function() {
                expect($location.path()).toBe('/setup');
            }
        );
    });
    });
});
