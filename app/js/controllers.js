'use strict';

/* Controllers */

angular.module('mysterysolver.controllers', ['mysterysolver.mystery'])
    .controller('SetupController', ['$scope', '$location', 'mystery', function($scope, $location, mystery) {

        init();
        
        function init() {
            $scope.playerCount = 2;
            $scope.players = [{ name: 'You', isCurrentPlayer: true, facts: 0 }, createPlayer(2)];
            $scope.direction = "counterclockwise";

            $scope.questions = [];
            for (var i = 0; i < mystery.questions.length; i++) {
                var question = {
                    name: mystery.questions[i].name,
                    facts: []
                };
                $scope.questions.push(question);
                
                for (var j = 0; j < mystery.questions[i].facts.length; j++) {
                    question.facts.push({                        
                        name: mystery.questions[i].facts[j].name,
                        selected: false
                    });
                };
            }
        }

        $scope.$watch('playerCount', function() {
            if (!angular.isNumber($scope.playerCount)) {
                $scope.playerCount = 2;
            }
            if ($scope.playerCount < 2) {
                $scope.playerCount = 2;
            }

            while ($scope.players.length > $scope.playerCount)
                $scope.players.pop();

            while ($scope.players.length < $scope.playerCount)
                $scope.players.push(createPlayer($scope.players.length + 1));
        });

        function createPlayer(number) {
            return {
                name: 'Player' + number,
                isCurrentPlayer: false,
                facts: null
            };
        }

        $scope.$watch('questions', function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                for (var j = 0; j < $scope.questions[i].facts.length; j++) {
                    if ($scope.questions[i].facts[j].selected)
                        count++;
                }
            }
            $scope.players[0].facts = count;
        }, true);

        $scope.start = function () {
            var currentPlayerFacts = [];
            for (var i = 0; i < $scope.questions.length; i++) {
                for (var j = 0; j < $scope.questions[i].facts.length; j++) {
                    if ($scope.questions[i].facts[j].selected)
                        currentPlayerFacts.push($scope.questions[i].facts[j].name);
                }
            }

            mystery.start($scope.players, $scope.direction, currentPlayerFacts);
            $location.path("/home");
        };
    }])
    .controller('HomeController', ['$scope', 'mystery', 'navigation', function($scope, mystery, navigation) {
        $scope.players = mystery.players;
        $scope.questions = mystery.questions;

        $scope.startTheory = function (playerIndex) {
            navigation.navigate('/theory', playerIndex);
        };
    }])
    .controller('TheoryController', ['$scope', 'mystery', 'navigation', function ($scope, mystery, navigation) {
        $scope.playerIndex = navigation.getNavigationData();
        $scope.playerName = mystery.players[$scope.playerIndex].name;
        
        initQuestions();

        function initQuestions() {
            $scope.questions = [];
            
            for (var i = 0; i < mystery.questions.length; i++) {
                $scope.questions.push({
                    name: mystery.questions[i].name,
                    facts: mystery.questions[i].facts,
                    value: null
                });
            }
        }

        $scope.isInvalid = function() {
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].value == null)
                    return true;
            }
            return false;
        };

        $scope.poseTheory = function () {
            var facts = [];
            for (var i = 0; i < $scope.questions.length; i++) {
                facts.push($scope.questions[i].value);
            }

            navigation.navigate('/theoryAnswer', {
                playerIndex: $scope.playerIndex,
                facts: facts
            });
        };
        
        $scope.cancel = function() {
            navigation.navigate('/home');
        };
    }])
    .controller('TheoryAnswerController', ['$scope', 'mystery', 'navigation', function ($scope, mystery, navigation) {
        var navigationData = navigation.getNavigationData();
        $scope.playerIndex = navigationData.playerIndex;
        $scope.playerName = mystery.players[$scope.playerIndex].name;
        $scope.facts = navigationData.facts;        

        $scope.cancel = function () {
            navigation.navigate('/home');
        };
    }]);