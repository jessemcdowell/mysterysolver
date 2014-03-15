'use strict';

var _currentMystery = _createMystery();

function _createMystery() {
    var mystery = {
        players: [],
        direction: 'counterclockwise',

        who: {},
        what: {},
        where: {},
        questions: [],

        init: function() {
            function createQuestion(name, facts) {
                var question = {
                    name: name,
                    facts: []
                };

                for (var i = 0; i < facts.length; i++) {
                    question.facts.push(createFact(facts[i]));
                }

                return question;
            }

            function createFact(name) {
                return {
                    name: name
                };
            }

            this.who = createQuestion("Who", ['Mr. Green', 'Colonel Mustard', 'Mrs. Peacock', 'Prof. Plum', 'Miss Scarlet', 'Mrs. White']);
            this.what = createQuestion("What", ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench']);
            this.where = createQuestion("Where", ['Ballroom', 'Billiard Room', 'Conservatory', 'Dining Room', 'Hall', 'Kitchen', 'Library', 'Lounge', 'Study']);
            this.questions = [this.who, this.what, this.where];
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
        }
    };
    mystery.init();
    return mystery;
};

angular.module('mysterysolver.mystery', [])
.factory('mystery', function() {
    return _currentMystery;
});