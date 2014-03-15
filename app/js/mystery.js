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
            function createQuestion(name, items) {
                var question = {
                    name: name,
                    items: []
                };

                for (var i = 0; i < items.length; i++) {
                    question.items.push(createItem(items[i]));
                }

                return question;
            }

            function createItem(name) {
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
                for (var j = 0; j < this.questions[i].items.length; j++) {
                    var item = this.questions[i].items[j];
                    
                    if (currentPlayerFacts.indexOf(item.name) == -1)
                        item.status = 'unknown';
                    else
                        item.status = 'mine';
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