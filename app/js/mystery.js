'use strict';

var _currentMystery = _createMystery();

function _createMystery() {
    var mystery = {
        players: [],
        direction: 'counterclockwise',

        who: {},
        what: {},
        where: {},
        facts: {},
        questions: [],

        init: function() {

            function createQuestion(name, facts) {
                var question = {
                    name: name,
                    facts: new Array(facts.length)
                };

                for (var i = 0; i < facts.length; i++) {
                    question.facts[i] = createFact(question, facts[i]);
                }

                return question;
            }

            var allFacts = {};

            function createFact(question, name) {
                var fact = {
                    question: question,
                    name: name
                };

                allFacts[name] = fact;

                return fact;
            }

            this.who = createQuestion("Who", ['Mr. Green', 'Colonel Mustard', 'Mrs. Peacock', 'Prof. Plum', 'Miss Scarlet', 'Mrs. White']);
            this.what = createQuestion("What", ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench']);
            this.where = createQuestion("Where", ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge', 'Study']);
            this.questions = [this.who, this.what, this.where];
            this.facts = allFacts;
        },

        start: function(players, direction, currentPlayerFacts) {
            this.direction = direction;

            this.players = Array(players.length);
            for (var i = 0; i < players.length; i++) {
                this.players[i] = {
                    name: players[i].name,
                    isCurrentPlayer: players[i].isCurrentPlayer,
                };

                if (players[i].isCurrentPlayer)
                    this.currentPlayerIndex = i;
            }            

            for (var i = 0; i < this.questions.length; i++) {
                for (var j = 0; j < this.questions[i].facts.length; j++) {
                    var fact = this.questions[i].facts[j];

                    fact.status = 'unknown';
                    fact.playerStatuses = new Array(players.length);
                    fact.playerStatuses[this.currentPlayerIndex] = false;
                    fact.knownByPlayerIndex = null;
                }
            }
            
            for (var i = 0; i < currentPlayerFacts.length; i++) {
                this.setPlayerFactStatus(this.currentPlayerIndex, currentPlayerFacts[i], true);
            }
        },

        setPlayerFactStatus: function(playerIndex, factName, knowsFact) {
            var fact = this.facts[factName];

            if (fact.playerStatuses[playerIndex] == knowsFact)
                return;
            
            fact.playerStatuses[playerIndex] = knowsFact;
            
            if (knowsFact) {
                fact.knownByPlayerIndex = playerIndex;

                if (playerIndex == this.currentPlayerIndex)
                    fact.status = 'mine';
                else
                    fact.status = 'known';

                // if the player knows the fact, then no else else can know it
                for (var i = 0; i < this.players.length; i++) {
                    if (i != playerIndex)
                        fact.playerStatuses[i] = false;
                }

                this.checkQuestionForAnswer(fact.question);
            } else {
                // if no player knows the fact, then it must be an answer
                var isAnswer = true;
                for (var i = 0; i < this.players.length; i++) {
                    if (fact.playerStatuses[i] != false) {
                        isAnswer = false;
                        break;
                    }
                }
                if (isAnswer) {
                    this.setAnswer(fact.name);
                }
            }
        },
        
        recordTheoryPasses: function(factNames, playerIndexes) {
            for (var i = 0; i < factNames.length; i++) {
                for (var j = 0; j < playerIndexes.length; j++) {
                    this.setPlayerFactStatus(playerIndexes[j], factNames[i], false);
                }
            }
        },
        
        recordTheoryResponder: function (factNames, playerIndex) {
            // if we know that other people had all the facts for a theory, then we know which fact the responder had
            var remainingFactIndex = null;
            for (var i = 0; i < factNames.length; i++) {
                var fact = this.facts[factNames[i]];

                if (fact.status !== 'unknown') {
                    if (fact.knownByPlayerIndex == playerIndex)
                        return;
                } else {
                    if (remainingFactIndex != null)
                        return;

                    remainingFactIndex = i;
                }
            }

            if (remainingFactIndex != null) {
                this.setPlayerFactStatus(playerIndex, factNames[remainingFactIndex], true);
            }
        },
        
        checkQuestionForAnswer: function (question) {
            // if we know who has all the facts but one of them, then it must be the answer
            var answerIndex = null;
            for (var i = 0; i < question.facts.length; i++) {
                var fact = question.facts[i];

                if (fact.status == 'answer')
                    return;
                
                if (fact.status == 'unknown') {
                    if (answerIndex != null)
                        return;
                    answerIndex = i;
                }
            }
            
            if (answerIndex != null) {
                this.setAnswer(question.facts[answerIndex].name);
            }
        },

        setAnswer: function(factName) {
            var fact = this.facts[factName];
            
            fact.status = 'answer';
        }

    };
    mystery.init();
    return mystery;
};

angular.module('mysterysolver.mystery', [])
.factory('mystery', function() {
    return _currentMystery;
});