var app = angular.module("Blocitoff", ["firebase"]);

angular.module('Blocitoff', [

  ])

  .controller('Task.controller', ['$scope', function($scope){
    $scope.subText = "Current Tasks";

    $scope.tasks = [
      'Do the Dishes',
      'Wash Clothes',
      'Get Oil Change',
      'Get groceries',
      'Tire Rotation'
    ];
    
  }]);