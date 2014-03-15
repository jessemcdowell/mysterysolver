'use strict';

// Declare app level module which depends on filters, and services
angular.module('mysterysolver', [
  'ngRoute',
  'mysterysolver.filters',
  'mysterysolver.services',
  'mysterysolver.directives',
  'mysterysolver.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', { templateUrl: 'partials/start.html', controller: 'SetupController' });
    $routeProvider.otherwise({ redirectTo: '/start' });
}]);
