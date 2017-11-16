/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('boxesViewController', boxesViewController)
    .directive('deviceBox', function () {
      return {
        restrict: 'E',
        templateUrl: '/modules/core/client/views/sub-views/deviceBox.client.view.html'
      };
    });

  boxesViewController.$inject = ['$scope','$uibModal','$http'];

  function boxesViewController($scope,$uibModal,$http) {
    var vm = this;
    vm.errorMessage = null;
    $scope.devices;

    $scope.updateUser = function(){

      $http({
        url: '/api/users/me',
        method: "GET"
      })
        .then(function(res){
          $scope.devices = res.data.devices;
        });
    };
    $scope.updateUser();

    $scope.getIcon = function(device){
      return {
        'background-image':'url(' + device.icon + ')',
        'background-size': 'auto 100%'
      }
    };

    $scope.openDevice = function(device){
      $uibModal.open({
        templateUrl: "/modules/core/client/views/sub-views/device.modal.client.view.html",
        controller: "DeviceModalController"
      }).result.then(function (res) {
        // $scope.updateUser(res)
      });
    };

    $scope.addNewRemote = function(){
      $uibModal.open({
        templateUrl: "/modules/core/client/views/sub-views/addNewController.html",
        controller: "AddNewControllerController"
      }).result.then(function (res) {
        $scope.updateUser(res)
      });
    }
  }
}());

