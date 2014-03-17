'use strict';

describe('controllers', function () {
    beforeEach(function() {
        module('mysterysolver.controllers');
        module('mysterysolver.services');
    });

    var $scope;
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));

    describe('SetupController', function() {
        var $location;
        beforeEach(inject(['$location', '$controller', function(location, $controller) {
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

    describe('TheoryAnswerController', function() {
        var navigation;
        var mystery;

        describe('with counter-clockwise direction', function() {
            beforeEach(inject(['$controller', 'navigation', function ($controller, navigationService) {
                navigation = navigationService;

                mystery = new Mystery();
                mystery.start([
                        { name: 'You', isCurrentPlayer: true, cards: 6 },
                        { name: 'Bob', isCurrentPlayer: false, cards: 6 },
                        { name: 'Tom', isCurrentPlayer: false, cards: 6 }
                ],
                    'counterclockwise',
                    ['Mr. Green', 'Colonel Mustard', 'Candlestick', 'Ballroom']
                );
                mystery.setPlayerFactStatus(2, 'Rope', true);

                navigation.navigate('/theoryAnswer', { playerIndex: 1, facts: ['Mr. Green', 'Rope', 'Hall'] });

                $controller('TheoryAnswerController', { $scope: $scope, navigation: navigation, mystery: mystery });
            }]));

            it('should have three facts', function () {
                expect($scope.facts.length).toBe(3);
            });

            it('should have the asking player index', function() {
                expect($scope.playerIndex).toBe(1);
            });

            it('should have the asking playing name', function() {
                expect($scope.playerName).toBe('Bob');
            });

            it('should have as many players as the mystery', function () {
                expect($scope.players.length).toBe(3);
            });

            it('should have the asking player first in the list of players', function() {
                expect($scope.players[0].playerIndex).toBe(1);
            });
        });

    });
});
