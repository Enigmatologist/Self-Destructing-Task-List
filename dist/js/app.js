(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('Blocitoff', [
  'firebase',
  'ui.router'  
  ]);


app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });
}]);


app.controller('Home.controller', ['$scope', '$firebase', function($scope, $firebase){
  var ref = new Firebase("https://blocitoff.firebaseio.com/tasks");
  var sync = $firebase(ref);

  $scope.tasks = sync.$asArray();

  $scope.addTask = function(task){
    $scope.tasks.$add({task: task});
    $scope.newTaskItem = "";
  };

}]);
},{}]},{},[1]);