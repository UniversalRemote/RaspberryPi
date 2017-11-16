/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('DeviceModalController', DeviceModalController);

  DeviceModalController.$inject = ['$scope','$stateParams'];

  function DeviceModalController($scope,  $stateParams) {
    var vm = this;
    $scope.device = $stateParams.deviceOn;

    $scope.getIcon = function(device){
      return {
        'background-image':'url(' + device.icon + ')',
        'background-size': '100% auto'
      }
    }

  }
}());
