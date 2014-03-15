﻿'use strict';

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
                { name: 'You', isCurrentPlayer: true, cards: 6 },
                { name: 'Bob', isCurrentPlayer: false, cards: 6 },
                { name: 'Tom', isCurrentPlayer: false, cards: 6 },
            ], 
            'clockwise', 
            ['Mr. Green', 'Colonel Mustard', 'Candlestick', 'Ballroom']);
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

        it('should have status mine for facts I had', function() {
            expect(mystery.who.items[0].status).toBe('mine');
        });

        it('should have status unknown for facts I didn\'t have', function () {
            expect(mystery.where.items[1].status).toBe('unknown');
        });
    });
});