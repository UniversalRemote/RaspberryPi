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
    var devices;
    // console.log(user);
    // UsersService.query({'username':user.username})
    //   .then(function(res){
    //     console.log(res);
    //   });

    // $scope.isEmpty = (!Authentication.user.devices && Authentication.user.devices.length > 0);



    $scope.updateUser = function(){

      $http({
        url: '/api/users/me',
        method: "GET"
      })
        .then(function(res){
          devices = res.data.devices;
          console.log(devices);
        });
    };

    $scope.updateUser();

   $scope.powerBtn = function(){
     $http({
       url: '/api/remote',
       method: "POST",
       data: {'name': "power",
       "code":"WAKE THE FUCK UP"}
     });
    };

    $scope.volumeUp = function(){
      $http({
        url: '/api/remote',
        method: "POST",
        data: {'name': "volume-up",
          "code":"0xE0E0E01F"}
      });
    };

    $scope.volumeDown = function(){
      $http({
        url: '/api/remote',
        method: "POST",
        data: {'name': "volume-down",
          "code":"0xE0E0D02F"}
      });
    };
  }

}());
