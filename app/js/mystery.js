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
                    question.facts[i] = createFact(facts[i]);
                }

                return question;
            }

            var allFacts = {};

            function createFact(name) {
                var fact = {
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
            this.players = players;

            for (var i = 0; i < this.questions.length; i++) {
                for (var j = 0; j < this.questions[i].facts.length; j++) {
                    var fact = this.questions[i].facts[j];

                    if (currentPlayerFacts.indexOf(fact.name) == -1)
                        fact.status = 'unknown';
                    else
                        fact.status = 'mine';
                }
            }
        },

        setPlayerFactStatus: function(playerIndex, factName, knowsFact) {

        },
        
        recordTheoryPasses: function(factNames, playerIndexes) {
            
        },
        
        recordTheoryResponder: function(factNames, playerIndex) {

        }
    };
    mystery.init();
    return mystery;
};

angular.module('mysterysolver.mystery', [])
.factory('mystery', function() {
    return _currentMystery;
});