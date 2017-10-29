'use strict';

// Create the 'chat' controller
angular.module('my_controllers').controller('MyControllerController', ['$scope',
  function ($scope) {
    $scope.controllers = [{
      title: "My TV"
    }, {
      title: "My 2nd TV"
    }, {
      title: "fasdjka fkjsdafkj a"
    }, {
      title: "fldslfldlfldlfldlf"
    }, {
      title: "fdaslkfks dkfsdk fksdkf kdfk sd"
    }, {
      title: "My 2nd TV"
    }];

    $scope.openModal = function () {
      console.log("helo world");
    };
  }
]);
