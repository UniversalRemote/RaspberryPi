/**
 * Created by Jorge-laptop3 on 11/16/2017.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('emptyController', EmptyController);

  EmptyController.$inject = ['$stateParams','$scope','$uibModal'];

  function EmptyController($stateParams,$scope,$uibModal) {
    var vm = this;
    vm.errorMessage = null;

    $scope.addNewRemote = function(){
      $uibModal.open({
        templateUrl: "/modules/core/client/views/sub-views/addNewController.html",
        controller: "AddNewControllerController"
      }).result.then(function (res) {
        // $scope.find();
      });
    }
  }
}());

