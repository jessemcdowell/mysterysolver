'use strict';

describe('controllers', function () {
    beforeEach(module('mysterysolver.controllers'));

    describe('SetupController', function() {
        var $scope;
        var $location;

        beforeEach(inject(['$rootScope', '$location', '$controller', function($rootScope, location, $controller) {
            $scope = $rootScope.$new();
            $location = location;

            $controller('SetupController', { $scope: $scope, $location: location });
        }]));

        it('should start with 2 players', function() {
            expect($scope.playerCount).toBe(2);
        });

        it('should have the first player as the current player', function() {
            expect($scope.players[0].isCurrentPlayer).toBe(true);
        });

        it('should have the second player as another player', function () {
            expect($scope.players[1].isCurrentPlayer).toBe(false);
        });

        it('should start with counter clockwise direction', function() {
            expect($scope.direction).toBe('counterclockwise');
        });

        it('should have three questions', function() {
            expect($scope.questions.length).toBe(3);
        });

        it('should have multiple facts for the first question', function() {
            expect($scope.questions[0].facts.length).toBeGreaterThan(0);
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
