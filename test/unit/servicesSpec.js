'use strict';

describe('service', function() {
    beforeEach(module('mysterysolver.services'));

    describe('mysteryNavigation service', function() {
        var $location, mysteryNavigation;
        
        beforeEach(inject(['$location', 'mysteryNavigation', function (location, mn) {
            $location = location;
            mysteryNavigation = mn;
        }]));

        it('should throw when getting data without navigation', function() {
            expect(function () { mysteryNavigation.getNavigationData(); }).toThrow();
        });

        describe("after navigating", function() {
            beforeEach(function() {
                mysteryNavigation.navigate('/dest', 1);
            });

            it('should set the path on $location', function() {
                expect($location.path()).toBe('/dest');
            });

            it('should return the data', function() {
                expect(mysteryNavigation.getNavigationData()).toBe(1);
            });

            it('should throw when fetching data from a different location', function() {
                $location.path('destination2');
                expect(function () { mysteryNavigation.getNavigationData(); }).toThrow();
            });
        });
    });
});
