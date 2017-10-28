'use strict';


// Configure the 'chat' module routes
angular.module('my_controllers').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('my_controllers', {
        url: '/my_controllers',
        templateUrl: 'modules/my_controllers/client/views/my_controllers.client.view.html'
      });
  }
]);
