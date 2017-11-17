var express = require("express");
var bodyParser = require("body-parser");
const exec = require('child_process').exec;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/sling', function (req, res) {
    sling(req.body.info.protocol, req.body.info.hexCode)
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
var sling = function(protocol, hexCodes) {
    return new Promise(function(resolve,reject) {
        if(callingCCode) {
            return reject("C code is currently in use.");
        }

        callingCCode = true;
        
	command = 'sudo "' + __dirname + '/sling.exe" ' + protocol + " ";
	
	hexCodes.forEach(function(hexCode) {
	    command += hexCode + " ";
	});

	command = command.trim();

	console.log(command);

	exec(command, function(error, stdout, stderr) {
            callingCCode = false;
            if (error) {
                stderr.myMessage = "You're running the C code too quickly!";
                return reject(stderr);
            }

            return resolve(stdout);
        });
    });
}

sling("SAMSUNG", ["0xE0E0E01F", "0x55555555"])
//sling("SAMSUNG", ["0xE0E0E01F"])
.then(function(res) {
    console.log(res);
})
.catch(function(err) {
    console.error(err);
});
