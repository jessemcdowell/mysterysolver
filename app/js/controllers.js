'use strict';

/* Controllers */

angular.module('mysterysolver.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller("HomeController", ['$scope', function($scope) {
      $scope.mysteries = [];
  }]);