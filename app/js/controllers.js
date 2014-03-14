'use strict';

/* Controllers */

angular.module('mysterysolver.controllers', [])
    .controller('SetupController', ['$scope', '$location', function ($scope, $location) {
        $scope.start = function() {
            $location.path("/home");
        };
    }])
;