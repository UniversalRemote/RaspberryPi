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
  var body = req.body;
  var info = getInfo(body.name, body.device);
  var url = getDeviceUrl(body.device);

  request.post(
    url,
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

/**
 * return url for device
 * @param device: contains device information
 */
var getDeviceUrl = function(device){
  return 'http://home.austinseber.com:20000/sling';
  //   return 'http://192.168.1.10:8080/sling'; //in local repo
};

/**
 * Returns information needed to send the device
 * @param keyName: KEY that was press
 * @param device: contains information about the device
 */
var getInfo = function(keyName, device){
    var info = {};

  var temp = getButton();
  info.protocol = temp.protocol;
  info.keyName = keyName;
  info.hexCode = [temp.keyMap[keyName]];

  return info;
};

var getButton = function () {
  return {
    protocol: "SAMSUNG",
    keyMap: {
      "KEY_0": "0xE0E08877",
      "KEY_1": "0xE0E020DF",
      "KEY_2": "0xE0E0A05F",
      "KEY_3": "0xE0E0609F",
      "KEY_4": "0xE0E010EF",
      "KEY_5": "0xE0E0906F",
      "KEY_6": "0xE0E050AF",
      "KEY_7": "0xE0E030CF",
      "KEY_8": "0xE0E0B04F",
      "KEY_9": "0xE0E0708F",
      "KEY_MINUS": "0xE0E0C43B",
      "KEY_VOLUME_UP": "0xE0E0E01F",
      "KEY_VOLUME_DOWN": "0xE0E0D02F",
      "KEY_CHANNEL_UP": "0xE0E048B7",
      "KEY_CHANNEL_DOWN": "0xE0E008F7",
      "KEY_POWER": "0xE0E040BF",
      "KEY_SOURCE": "0xE0E0807F",
      "KEY_MUTE": "0xE0E0F00F",
      "KEY_UP": "0xE0E006F9",
      "KEY_RIGHT": "0xE0E046B9",
      "KEY_DOWN": "0xE0E08679",
      "KEY_LEFT": "0xE0E0A659",
      "KEY_ENTER": "0xE0E016E9",
      "KEY_MENU": "0xE0E058A7"
    }
  };
};
