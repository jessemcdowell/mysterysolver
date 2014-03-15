'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
    beforeEach(module('mysterysolver.controllers'));

    describe('SetupController', function() {
        var $scope;
        var $location;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $location = locationMock.new();

            $controller('SetupController', { $scope: $scope, $location: $location });
        }));

        it('should start with 2 players', function() {
            expect($scope.playerCount).toBe(2);
        });

        it('should have the first player as the current player', function() {
            expect($scope.players[0].isCurrentPlayer).toBe(true);
        });

        it('should have an unknown number of cards', function () {
            expect($scope.players[0].cards).toBeNull();
        });

        it('should have the second player as another player', function () {
            expect($scope.players[1].isCurrentPlayer).toBe(false);
        });

        it('should start with counter clockwise direction', function() {
            expect($scope.direction).toBe('counterclockwise');
        });

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
