(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController)
    .directive('emptyHtml', function () {
      return {
        restrict: 'E',
        templateUrl: '/modules/core/client/views/sub-views/empty.client.view.html',
        controller: 'emptyController'
      };
    }).directive('boxesHtml', function () {
    return {
      restrict: 'E',
      templateUrl: '/modules/core/client/views/sub-views/boxesView.client.view.html',
      controller: 'boxesViewController'
    };
  });

  HomeController.$inject = ['$scope','$http','Authentication','UsersService'];

  function HomeController($scope,$http,Authentication,UsersService) {
    var vm = this;
    $scope.devices;


    $scope.updateUser = function(){

      $http({
        url: '/api/users/me',
        method: "GET"
      })
        .then(function(res){
          $scope.devices = res.data.devices;
          $scope.isEmpty = (!$scope.devices || $scope.devices.length == 0);

        });
    };

    $scope.updateUser();
  }

}());
