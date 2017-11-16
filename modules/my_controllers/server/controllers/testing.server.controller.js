/**
 * Created by Jorge-laptop3 on 11/7/2017.
 */

var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  request = require('request');


/**
 * function for uploading files
 */
var uploadFile = function (fileInfo, singleName, req, res) {
  var upload = multer(fileInfo).single(singleName);
  return new Promise(function (resolve, reject) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return reject({
          err: uploadError,
          message: 'Error occurred while uploading file'
        });
      } else {
        if (!req.file) {
          return reject({
            message: 'Error saving file'
          });
        }
        return resolve({
          message: 'All good',
          file: req.file
        });
      }
    });
  });
};

/**
 * Upload Icon
 */
exports.uploadIcon = function (req, res) {
  var fileInfo = config.uploads.remote.icon;
  var singleName = 'icon';

  uploadFile(fileInfo, singleName, req, res)
    .then(function (r) {
      return res.status(200).send(r);
    }).catch(function (err) {
    return res.send({message: errorHandler.getErrorMessage(err)});
  })
};


exports.send = function (req, res) {
  var info = req.body;
  request.post(
    'http://home.austinseber.com:20000/sling',
    {json: {info: info}},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.send("good");
      }
    }
  );
};


/**
 * Update a User
 */
exports.addNewDevice = function (req, res) {
  var user = req.user;

  //TODO: CHECK BEFORE ADDING
  user.devices.push(req.body);

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Get all the functionality for a specific remote
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  res.send(getButton());
};


var getButton = function () {
  return [{
    name: "power",
    code: "000"
  }, {
    name: "volume-up",
    code: "001"
  }, {
    name: "volume-down",
    code: "002"
  }, {
    name: "channel-up",
    code: "003"
  }, {
    name: "channel-down",
    code: "004"
  }, {
    name: "volume-off",
    code: "005"
  }];
};
