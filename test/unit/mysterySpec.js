'use strict';

describe('mystery', function () {
    var mystery = {};
    beforeEach(function() {
        mystery = _createMystery();
    });

    describe('is initialized', function() {
        it('should have no players', function() {
            expect(mystery.players.length).toBe(0);
        });

        it('should have 3 questions', function() {
            expect(mystery.questions.length).toBe(3);
        });

        it('should have six suspects', function () {
            expect(mystery.who.items.length).toBe(6);
        });

        it('should have six weapons', function () {
            expect(mystery.what.items.length).toBe(6);
        });

        it('should have nine locations', function () {
            expect(mystery.where.items.length).toBe(9);
        });

        it('should have a counterclockwise direction', function () {
            expect(mystery.direction).toBe('counterclockwise');
        });
    });

    describe('is started', function () {
        beforeEach(function() {
            mystery.start([
                { name: 'You', isCurrentPlayer: true },
                { name: 'Bob', isCurrentPlayer: false },
                { name: 'Tom', isCurrentPlayer: false },
            ], 'clockwise');
        });

        it('should have the specified players', function() {
            expect(mystery.players.length).toBe(3);
        });
        
        it('should have the current player in the first position', function () {
            expect(mystery.players[0].isCurrentPlayer).toBe(true);
        });

        it('should have the specified direction', function () {
            expect(mystery.direction).toBe("clockwise");
        });
    });
});