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
    // .put(remote.update);

  // Single article routes
  // app.route('/api/remote/:articleId').all()
  //   .get(remote.read)
  //   .put(remote.update)
  //   .delete(remote.delete);

  // Finish by binding the article middleware
  // app.param('articleId', remote.articleByID);
};
