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
                    items: []
                };
                $scope.questions.push(question);
                
                for (var j = 0; j < mystery.questions[i].items.length; j++) {
                    question.items.push({                        
                        name: mystery.questions[i].items[j].name,
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
                for (var j = 0; j < $scope.questions[i].items.length; j++) {
                    if ($scope.questions[i].items[j].selected)
                        count++;
                }
            }
            $scope.players[0].facts = count;
        }, true);

        $scope.start = function () {
            var questionItems = [];
            for (var i = 0; i < $scope.questions.length; i++) {
                for (var j = 0; j < $scope.questions[i].items.length; j++) {
                    if ($scope.questions[i].items[j].selected)
                        questionItems.push($scope.questions[i].items[j].name);
                }
            }

            mystery.start($scope.players, $scope.direction, questionItems);
            $location.path("/home");
        };
    }])
    .controller('HomeController', ['$scope', 'mystery', function($scope, mystery) {
        $scope.players = mystery.players;
    }]);