(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope','$http'];

  function HomeController($scope,$http) {
    var vm = this;
    // var getName = function(){
    //   $http({
    //     url: '/api/remote',
    //     method: "GET",
    //     data: {'name': "mySimpleRemote"}
    //   }).then(function(res) {
    //
    //   }, function (err) {
    //
    //   });
    // };
    // getName();
    // var
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
