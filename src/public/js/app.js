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
    .state('edit', {
      url: '/edit/:id?key',
      templateUrl: 'public/template/edit.html',
      controller: EditCtrl
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

  $scope.editPosts = function (id) {
    $state.go('edit', {'key' : $state.params.key, 'id': id})
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

function EditCtrl($scope, $http, $rootScope, $state) {
  let idItem = $state.params.id
  for (var i = 0; i < $rootScope.list.length; i++) {
    if ($rootScope.list[i].id == idItem) {
      $scope.title = $rootScope.list[i].title
      $scope.categories = $rootScope.list[i].categories
      $scope.content = $rootScope.list[i].content
      console.log($scope.content)
    }
  }

  $scope.savePosts = function () {
    let data = {
      'title': $scope.title,
      'categories': $scope.categories,
      'content': $scope.content
    };

    $http.put('/api/posts/' + idItem, data,{headers: {'token' : $state.params.key}}).success(function (res) {
      for(var i = 0; i < $rootScope.list.length; i++) {
        if ($rootScope.list[i].id == idItem) {
          $rootScope.list[i].title = $scope.title;
          $rootScope.list[i].categories = $scope.categories
          $rootScope.list[i].content = $scope.content
        }
      }
    })

    $state.go('list', {'key' : $state.params.token})
  }
}
