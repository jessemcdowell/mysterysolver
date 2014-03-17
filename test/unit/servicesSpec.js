'use strict';

describe('service', function() {
    beforeEach(module('mysterysolver.services'));

    describe('navigation service', function() {
        var $location, navigation;
        
        beforeEach(inject(['$location', 'navigation', function (location, mn) {
            $location = location;
            navigation = mn;
        }]));

        it('should throw when getting data without navigation', function() {
            expect(function () { navigation.getNavigationData(); }).toThrow();
        });

        describe("after navigating", function() {
            beforeEach(function() {
                navigation.navigate('/dest', 1);
            });

            it('should set the path on $location', function() {
                expect($location.path()).toBe('/dest');
            });

            it('should return the data', function() {
                expect(navigation.getNavigationData()).toBe(1);
            });

            it('should throw when fetching data from a different location', function() {
                $location.path('destination2');
                expect(function () { navigation.getNavigationData(); }).toThrow();
            });
        });
    });
});
