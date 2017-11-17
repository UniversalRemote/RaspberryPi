/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('DeviceModalController', DeviceModalController);

  DeviceModalController.$inject = ['$scope', '$stateParams','$http'];

  function DeviceModalController($scope, $stateParams,$http) {
    var vm = this;
    $scope.device = $stateParams.deviceOn;

    $scope.getIcon = function (device) {
      return {
        'background-image': 'url(' + device.icon + ')',
        'background-size': '100% auto'
      }
    }

    var getKey = function () {
      return {
        "KEY_0": "KEY_0",
        "KEY_1": "KEY_1",
        "KEY_2": "KEY_2",
        "KEY_3": "KEY_3",
        "KEY_4": "KEY_4",
        "KEY_5": "KEY_5",
        "KEY_6": "KEY_6",
        "KEY_7": "KEY_7",
        "KEY_8": "KEY_8",
        "KEY_9": "KEY_9",
        "KEY_MINUS": "KEY_MINUS",
        "KEY_VOLUME_UP": "KEY_VOLUME_UP",
        "KEY_VOLUME_DOWN": "KEY_VOLUME_DOWN",
        "KEY_CHANNEL_UP": "KEY_CHANNEL_UP",
        "KEY_CHANNEL_DOWN": "KEY_CHANNEL_DOWN",
        "KEY_POWER": "KEY_POWER",
        "KEY_SOURCE": "KEY_SOURCE",
        "KEY_MUTE": "KEY_MUTE",
        "KEY_UP": "KEY_UP",
        "KEY_RIGHT": "KEY_RIGHT",
        "KEY_DOWN": "KEY_DOWN",
        "KEY_LEFT": "KEY_LEFT",
        "KEY_ENTER": "KEY_ENTER",
        "KEY_MENU": "KEY_MENU"
      }
    };

    $scope.key = getKey();

    $scope.press = function (code) {
      $http({
        url: '/api/remote',
        method: "POST",
        data: {
          'name': code,
          "device": $scope.device
        }
      })
        .then(function () {

        })
        .catch(function (err) {


        });
    }
  }
}());
