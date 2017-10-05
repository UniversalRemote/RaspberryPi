/**
 * Created by AlejandroC on 10/2/2017.
 */

let baseRoute = "/api";
let port = process.env.PORT || 8000;

let express = require("express");
let RouteHelper = require("./Helpers/routesHelper");
let app = express();


app.listen(port);

//Initialize helpers
let routesHelper = new RouteHelper(app);

//Initialize controllers
let controllerInitializer = require("./Contollers/controllersInitializer");
controllerInitializer(baseRoute, routesHelper);
