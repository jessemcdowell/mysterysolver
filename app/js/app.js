'use strict';

// Declare app level module which depends on filters, and services
angular.module('mysterysolver', [
  'ngRoute',
  'mysterysolver.mystery',
  'mysterysolver.filters',
  'mysterysolver.services',
  'mysterysolver.directives',
  'mysterysolver.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', { templateUrl: 'partials/start.html', controller: 'SetupController' });
    $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeController' });
    $routeProvider.when('/theory', { templateUrl: 'partials/theory.html', controller: 'TheoryController' });
    $routeProvider.when('/theoryAnswer', { templateUrl: 'partials/theoryAnswer.html', controller: 'TheoryAnswerController' });
    $routeProvider.otherwise({ redirectTo: '/start' });
}]);
