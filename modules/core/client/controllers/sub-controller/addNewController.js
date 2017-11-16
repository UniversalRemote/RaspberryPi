/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddNewControllerController', AddNewControllerController);

  AddNewControllerController.$inject = ['$stateParams','$scope'];

  function AddNewControllerController($stateParams,$scope) {
      var vm = this;
      vm.errorMessage = null;

      $scope.device = {};
      $scope.saveDevice = function(){
        var iconPath;

        uploadIcon()
          .then(function (res) {
            iconPath = res.data.file;
            // return uploadPdf();
            return addNewDevice(iconPath.destination + iconPath.filename);
          })
          .then(function (res) {
            $scope.$close(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      };

    var addNewDevice = function (iconUrl) {

      var addDevice = new Device({
        name: $scope.device.name,
        id: $scope.device.id,
        type: $scope.device.type,
        brand: $scope.device.brand,
        modal: $scope.device.modal,
        icon: iconUrl
      });

      return new Promise(function (resolve, reject) {
        addDevice.$save(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
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

