'use strict';

/* Controllers */

angular.module('mysterysolver.controllers', ['mysterysolver.mystery'])
    .controller('SetupController', ['$scope', '$location', 'mystery', function($scope, $location, mystery) {

        init();
        
        function init() {
            $scope.playerCount = 2;
            $scope.players = [{ name: 'You', isCurrentPlayer: true, cards: null }, createPlayer(2)];
            $scope.direction = "counterclockwise";
        }

        $scope.$watch('playerCount', function(oldValue, newValue) {
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
                cards: null
            };
        }

        $scope.start = function () {
            mystery.start($scope.players, $scope.direction);
            $location.path("/home");
        };       
    }])
    .controller('HomeController', ['$scope', 'mystery', function($scope, mystery) {
        $scope.players = mystery.players;
    }]);