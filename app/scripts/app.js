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