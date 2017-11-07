/**
 * Created by Jorge-laptop3 on 11/7/2017.
 */

var request = require('request');

exports.send = function (req, res) {
  var info = req.body;
  console.log("HERE");
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
