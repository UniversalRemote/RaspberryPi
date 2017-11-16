/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('DeviceModalController', DeviceModalController);

  DeviceModalController.$inject = ['$scope', '$state', 'menuService'];

  function DeviceModalController($scope, $state, menuService) {
    var vm = this;

  }
}());
