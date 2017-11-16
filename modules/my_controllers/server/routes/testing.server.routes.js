/**
 * Created by Jorge-laptop3 on 11/7/2017.
 */


// var articlesPolicy = require('../policies/remote.server.policy'),
var remote = require('../controllers/testing.server.controller');

module.exports = function (app) {

  app.route('/api/user/update')
    .post(remote.addNewDevice);

  app.route('/api/remote/icon')
    .post(remote.uploadIcon);

  // Articles collection routes
  app.route('/api/remote').all()
    .get(remote.list)
    .post(remote.send);
};
