/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddNewControllerController', AddNewControllerController);

  AddNewControllerController.$inject = ['$stateParams', '$scope', 'Authentication', '$http', 'Upload'];

  function AddNewControllerController($stateParams, $scope, Authentication, $http, Upload) {
    var vm = this;
    vm.errorMessage = null;
    user = Authentication.user;

    $scope.device = {};
    $scope.saveDevice = function () {
      var iconPath;

      uploadIcon()
        .then(function (res) {
          iconPath = res.data.file;
          // return uploadPdf();
          if (!iconPath) {
            return addNewDevice('./modules/core/client/img/extra/cartoon-remote-control.jpg');
          } else {
            return addNewDevice(iconPath.destination + iconPath.filename);
          }
        })
        .then(function (res) {
          $scope.$close(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    var addNewDevice = function (iconUrl) {

      $scope.device.icon = iconUrl;

      $http({
        method: 'POST',
        url: '/api/user/update',
        data: $scope.device
      })
        .then(function (res) {
          console.log(res);
        }).catch(function (err) {
        console.log(err);
      });
    };


    var uploadIcon = function () {
      return new Promise(function (resolve, reject) {
        var icon = $scope.device.icon;
        Upload.upload({
          url: '/api/remote/icon',
          data: {
            icon: icon
          }
        }).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          reject(err)
        });
      });
    };
  }
}());

