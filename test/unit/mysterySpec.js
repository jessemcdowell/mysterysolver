﻿'use strict';

describe('mystery', function () {
    var mystery = {};
    beforeEach(function() {
        mystery = new Mystery();
    });

    describe('is initialized', function() {
        it('should have no players', function() {
            expect(mystery.players.length).toBe(0);
        });

        it('should have 3 questions', function() {
            expect(mystery.questions.length).toBe(3);
        });

        it('should have six suspects', function () {
            expect(mystery.who.facts.length).toBe(6);
        });

        it('should have six weapons', function () {
            expect(mystery.what.facts.length).toBe(6);
        });

        it('should have nine locations', function () {
            expect(mystery.where.facts.length).toBe(9);
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
                { name: 'Tom', isCurrentPlayer: false, cards: 6 }
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
            expect(mystery.facts['Mr. Green'].status).toBe('mine');
        });

        it('should have status unknown for facts I didn\'t have', function () {
            expect(mystery.facts['Billiard Room'].status).toBe('unknown');
        });


        describe('and a player shows us a fact', function () {
            beforeEach(function() {
                mystery.setPlayerFactStatus(1, 'Mrs. White', true);
            });

            it('should have a status of known', function () {
                expect(mystery.facts['Mrs. White'].status).toBe('known');
            });
        });

        describe('and no one has a card from a theory', function() {
            beforeEach(function() {
                mystery.recordTheoryPasses(['Mrs. White', 'Candlestick', 'Ballroom'], [1, 2]);
            });

            it('should have a status of answer', function() {
                expect(mystery.facts['Mrs. White'].status).toBe('answer');
            });
        });


        describe('and the current player poses a theory about a fact they possess', function () {
            beforeEach(function () {
                mystery.recordTheoryPasses(['Mrs. White', 'Candlestick', 'Ballroom'], [1, 2]);
            });

            it('should not change status', function () {
                expect(mystery.facts['Ballroom'].status).toBe('mine');
            });
        });

        describe('and we know the location of all the facts in a question but one', function() {
            beforeEach(function() {
                mystery.setPlayerFactStatus(1, 'Mrs. Peacock', true);
                mystery.setPlayerFactStatus(1, 'Prof. Plum', true);
                mystery.setPlayerFactStatus(2, 'Miss Scarlet', true);
            });

            it('should change the last fact in the question to status answer', function() {
                expect(mystery.facts['Mrs. White'].status).toBe('answer');
            });
        });

        describe('and we know other people have the other facts from a posed theory', function () {
            beforeEach(function () {
                mystery.setPlayerFactStatus(2, 'Rope', true);
                mystery.recordTheoryResponder(['Mr. Green', 'Rope', 'Dining Room'], 1);
            });

            it('should have a status of known', function () {
                expect(mystery.facts['Dining Room'].status).toBe('known');
            });
        });
        
        describe('and we know someone knows a fact and it and another fact are posed in a theory and the person answers', function() {
            beforeEach(function () {
                mystery.setPlayerFactStatus(1, 'Rope', true);
                mystery.recordTheoryResponder(['Mr. Green', 'Rope', 'Dining Room'], 1);
            });

            it('should keep a status of unknown', function() {
                expect(mystery.facts['Dining Room'].status).toBe('unknown');
            });
        });
    });


    describe('is counter-clockwise mid game', function() {
        beforeEach(function() {
            mystery.start([
                    { name: 'You', isCurrentPlayer: true, cards: 6 },
                    { name: 'Bob', isCurrentPlayer: false, cards: 6 },
                    { name: 'Tom', isCurrentPlayer: false, cards: 6 }
                ],
                'counterclockwise',
                ['Mr. Green', 'Colonel Mustard', 'Candlestick', 'Ballroom']
            );
            mystery.setPlayerFactStatus(2, 'Rope', true);
        });

        describe('getTheoryPlayerData()', function() {
            var playerData;
            beforeEach(function() {
                playerData = mystery.getTheoryPlayerData(1, ['Mr. Green', 'Rope', 'Hall']);
            });

            it('should return as many players as the mystery', function () {
                expect(playerData.length).toBe(3);
            });

            it('should return the asking player first in the list of players', function () {
                expect(playerData[0].playerIndex).toBe(1);
            });

            it('should return all players arranged in counter-clockwise order', function () {
                expect(playerData[0].playerIndex).toBe(1);
                expect(playerData[1].playerIndex).toBe(0);
                expect(playerData[2].playerIndex).toBe(2);
            });

            it('should return status known for current player and Mr. Green', function () {
                expect(playerData[1].factStatuses[0].status).toBe('known');
            });

            it('should return status negative for Tom and Mr. Green', function () {
                expect(playerData[2].factStatuses[0].status).toBe('negative');
            });

            it('should return status known for Tom and Rope', function () {
                expect(playerData[2].factStatuses[1].status).toBe('known');
            });

            it('should return status negative for current player and Rope', function () {
                expect(playerData[1].factStatuses[1].status).toBe('negative');
            });
           
            it('should return status unknown for Tom and Hall', function () {
                expect(playerData[2].factStatuses[2].status).toBe('unknown');
            });
        });
    });

    describe('is clockwise mid game', function () {
        beforeEach(function() {
            mystery.start([
                    { name: 'You', isCurrentPlayer: true, cards: 6 },
                    { name: 'Bob', isCurrentPlayer: false, cards: 6 },
                    { name: 'Tom', isCurrentPlayer: false, cards: 6 }
                ],
                'clockwise',
                ['Mr. Green', 'Colonel Mustard', 'Candlestick', 'Ballroom']
            );
            mystery.setPlayerFactStatus(2, 'Rope', true);
        });

        describe('getTheoryPlayerData()', function () {
            var playerData;
            beforeEach(function () {
                playerData = mystery.getTheoryPlayerData(1, ['Mr. Green', 'Rope', 'Hall']);
            });

            it('should return as many players as the mystery', function () {
                expect(playerData.length).toBe(3);
            });

            it('should return the asking player first in the list of players', function () {
                expect(playerData[0].playerIndex).toBe(1);
            });

            it('should return all players arranged in clockwise order', function () {
                expect(playerData[0].playerIndex).toBe(1);
                expect(playerData[1].playerIndex).toBe(2);
                expect(playerData[2].playerIndex).toBe(0);
            });
        });
    });
});