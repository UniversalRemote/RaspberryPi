'use strict';

// Configuring the Articles module
angular.module('my_controllers').run(['menuService',
  function (Menus) {
    // Add the remote dropdown item
    Menus.addMenuItem('topbar', {
      title: 'My Controllers',
      state: 'my_controllers',
      roles: ['user', 'admin']
    });
  }
]);
