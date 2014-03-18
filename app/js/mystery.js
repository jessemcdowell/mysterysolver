'use strict';

function Mystery() {
    this.players = [];
    this.direction = 'counterclockwise';

    var allFacts = {};

    function createQuestion(name, factNames) {
        var question = {
            name: name,
            facts: new Array(factNames.length)
        };

        for (var i = 0; i < factNames.length; i++) {
            question.facts[i] = createFact(question, factNames[i]);
        }

        return question;
    }

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


    this.start = function(players, direction, currentPlayerFacts) {
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
    };

    this.setPlayerFactStatus = function(playerIndex, factName, knowsFact) {
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

            checkQuestionForAnswer(fact.question);
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
                setAnswer(fact);
            }
        }
    };

    this.recordTheoryPasses = function(factNames, playerIndexes) {
        for (var i = 0; i < factNames.length; i++) {
            for (var j = 0; j < playerIndexes.length; j++) {
                this.setPlayerFactStatus(playerIndexes[j], factNames[i], false);
            }
        }
    };

    this.recordTheoryResponder = function(factNames, playerIndex) {
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
    };

    this.getTheoryPlayerData = function(theoryPlayerIndex, factNames) {
        var playerData = [];
        for (var i = 0; i < this.players.length; i++) {
            var playerIndex = theoryPlayerIndex + ((this.direction == 'clockwise') ? i : -i);
            while (playerIndex >= this.players.length)
                playerIndex -= this.players.length;
            while (playerIndex < 0)
                playerIndex += this.players.length;

            var factStatuses = new Array(factNames.length);
            for (var j = 0; j < factNames.length; j++) {
                var fact = this.facts[factNames[j]];

                var factStatus;
                if (fact.playerStatuses[playerIndex] == true)
                    factStatus = 'known';
                else if (fact.playerStatuses[playerIndex] == false)
                    factStatus = 'negative';
                else
                    factStatus = 'unknown';

                factStatuses[j] = { status: factStatus };
            }

            playerData.push({
                playerIndex: playerIndex,
                name: this.players[playerIndex].name,
                factStatuses: factStatuses
            });
        }
        return playerData;
    };

    function checkQuestionForAnswer(question) {
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
            setAnswer(question.facts[answerIndex]);
        }
    }

    function setAnswer(fact) {
        fact.status = 'answer';
    }
};

angular.module('mysterysolver.mystery', [])
.factory('mystery', function () {
    var mystery = new Mystery();

    return mystery;
});