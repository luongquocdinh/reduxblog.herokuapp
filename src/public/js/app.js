/**
 * Created by thinhvoxuan on 6/16/16.
 */

var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      url: "/token",
      templateUrl: 'public/template/index.html',
      controller: InputToken
    })
    .state('create', {
      url: "/create?key",
      templateUrl: 'public/template/addPost.html',
      controller: AddPostCtrl
    })
    .state('list', {
      url: "/list?key",
      templateUrl: 'public/template/list.html',
      controller: ListCtrl
    })
    

  $urlRouterProvider.otherwise("index");
});

function InputToken($scope, $http, $rootScope, $state) {
  $scope.listPosts = function () {
    $http.get('/api/posts', {headers: {'token' : $scope.token}}).success(function(data) {
      $rootScope.list = data
      $state.go('list', {'key' : $scope.token})
    })
  }
}

function ListCtrl($scope, $state, $http, $rootScope) {
  $scope.addPosts = function () {
    $state.go('create', {'key' : $state.params.key})
  }

  $scope.delPosts = function (id) {
    let message = 'Are you sure?'
    if (message && confirm(message)) {
      $http.delete('/api/posts/' + id, {headers: {'token' : $state.params.key}}).success(function (res) {
        for(var i = 0; i < $rootScope.list.length; i++) {
          if ($rootScope.list[i].id === id) {
            $rootScope.list.splice(i, 1)
          }
        }
      })
    }
  }
}

function AddPostCtrl($scope, $http, $rootScope, $state) {
  $scope.savePosts = function () {
    let data = {
      'title': $scope.title,
      'categories': $scope.categories,
      'content': $scope.content
    };

    console.log(data)

    $http.post('/api/posts', data, {headers: {'token' : $state.params.key}}).success(function (res) {
      $rootScope.list.push(res.post)
      $state.go('list', {'key' : $state.params.token})
    })
  }
}
