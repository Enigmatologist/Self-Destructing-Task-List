var app = angular.module('Blocitoff', [
  'firebase',
  'ui.router'  
  ]);


app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider.state('active', {
    url: '/',
    controller: 'Active.controller',
    templateUrl: '/templates/active.html'
  });

  $stateProvider.state('completed', {
    url: '/completed',
    controller: 'Completed.controller',
    templateUrl: '/templates/completed.html'
  });

  $stateProvider.state('expired', {
    url: '/expired',
    controller: 'Expired.controller',
    templateUrl: '/templates/expired.html'
  });

}]);


app.controller('Active.controller', ['$scope', '$firebase', function($scope, $firebase){
  var ref = new Firebase("https://blocitoff.firebaseio.com/tasks");
  var sync = $firebase(ref);

  //Synchronize task list as array
        //$scope.tasks = sync.$asArray();
  var tasks = sync.$asArray();
  $scope.tasks = tasks;      

  //Add a task to the list
  $scope.addTask = function(task){
    $scope.tasks.$add({
      task: task,
      state: "active",
      dateAdded: Firebase.ServerValue.TIMESTAMP
      });
    $scope.newTaskItem = "";
  };

  //complete a task and its saved
  $scope.completeTask = function(taskId){
    var task = tasks.$getRecord(taskId);
    task.state = "complete";
    tasks.$save(task);
  };

  //function to move an item
  $scope.move = function(index, direction){
    //Moving up
    if(direction === 'up') {
      if(index === 0) {
        return;
      }
      index -= 1;
    }
    //Moving down
    if(direction === 'down') {
      if(index === $scope.tasks.length - 1){
        return;
      }
    }

    var todo = $scope.tasks[index];
    $scope.tasks.splice(index + 2, 0, todo);
    $scope.tasks.splice(index, 1);
    
  };

  //make task expire after certain time
  $scope.expireTask = function(taskId) {
    var task = tasks.$getRecord(taskId);
    var today = new Date();
    var now = today.getTime();
    var days = 24 * 60 * 60 * 1000 //hours mins secs millisecs

    if(task.state == "active" && (now - task.dateAdded) >= (7 * days)) {
      task.state = "expired";
      tasks.$save(task);
    }
  };

}]);


app.controller('Completed.controller', ['$scope', '$firebase', function($scope, $firebase){
  var ref = new Firebase("https://blocitoff.firebaseio.com/tasks");
  var sync = $firebase(ref);

  //Synchronize task list as array
  var tasks = sync.$asArray();
  $scope.tasks = tasks;

  //if task not complete move it back to active state
  $scope.undoComplete = function(taskId){
    var task = tasks.$getRecord(taskId);
    task.state = "active";
    tasks.$save(task);
  };

}]);


app.controller('Expired.controller', ['$scope', '$firebase', function($scope, $firebase){
  var ref = new Firebase("https://blocitoff.firebaseio.com/tasks");
  var sync = $firebase(ref);

  //Sync task list as array
  var tasks = sync.$asArray();
  $scope.tasks = tasks;
  
}]);


