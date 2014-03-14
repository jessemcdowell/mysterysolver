'use strict';

/* Controllers */

angular.module('mysterysolver.controllers', [])
    .controller('HomeController', ['$scope', '$location', function($scope, $location) {
        $scope.mysteries = [];

        $scope.createNew = function() {
            $scope.mysteries.push({
                name: "Mystery 1"
            });
            ;
            $location.path('/setup');
        };
    }])
    .controller('SetupController', ['$scope', '$location', function($scope, $location) {

    }])
;