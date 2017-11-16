var express = require("express");
var bodyParser = require("body-parser");
const exec = require('child_process').exec;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/sling', function (req, res) {
    console.log(req);
    if (req.body.info.protocol != "NEC") {
        return res.status(422).send("Only the NEC protocol is supported at the moment");
    }
    sling(req.body.info.hexCode)
    .then(function(message) {
        console.log(message);
        return res.send(message);
    })
    .catch(function(err) {
        console.error(err);
        return res.send(err);
    })
});

app.get('*', function(req, res){
    res.status(404).send("You should not be connecting to this device like this.");
});

app.listen("8080");

console.log("server listening on: http://localhost:8080");

var callingCCode = false;
var sling = function(code) {
    return new Promise(function(resolve,reject) {
        if(callingCCode) {
            return reject("C code is currently in use.");
        }

        callingCCode = true;
        exec('sudo "' + __dirname +'/sling.exe" ' + code, function(error, stdout, stderr) {
            callingCCode = false;
            if (error) {
                stderr.myMessage = "You're running the C code too quickly!";
                return reject(stderr);
            }

            return resolve(stdout);
        });
    });
}

/*sling("0xE0E0E01F")
.then(function(res) {
    console.log(res);
})
.catch(function(err) {
    console.error(err);
});*/
