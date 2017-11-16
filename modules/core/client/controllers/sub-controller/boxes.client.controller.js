/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('boxesViewController', boxesViewController);

  boxesViewController.$inject = ['$stateParams','$scope','$uibModal'];

  function boxesViewController($stateParams,$scope,$uibModal) {
    var vm = this;
    vm.errorMessage = null;

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

