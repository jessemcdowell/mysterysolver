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

        start: function(players, direction, questionItems) {
            this.direction = direction;
            this.players = players;
        }
    };
    mystery.init();
    return mystery;
};

angular.module('mysterysolver.mystery', [])
.factory('mystery', function() {
    return _currentMystery;
});