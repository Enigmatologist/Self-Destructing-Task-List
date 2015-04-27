var app = angular.module("Blocitoff", ["firebase"]);

app.controller('Task.controller', ['$scope', '$firebase', function($scope, $firebase){
  var ref = new Firebase("https://blocitoff.firebaseio.com/tasks");
  var sync = $firebase(ref);

  $scope.tasks = sync.$asArray();

  $scope.addTask = function(task){
    $scope.tasks.$add({task: task});
  };

}]);