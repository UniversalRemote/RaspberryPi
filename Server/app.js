/**
 * Created by AlejandroC on 10/2/2017.
 */

let baseRoute = "/api";
let port = process.env.PORT || 8000;

let express = require("express");
let app = express();


app.listen(post);

//Initialize helpers
let routesHeper = require("Helpers/routesHelper")(app);

//Initialize controllers
let controllerInitializer = require("Contollers/controllersInitializer");
controllerInitializer(baseRoute, app);
