/**
 * Created by AlejandroC on 10/2/2017.
 */

let fs = require("fs");
let path = require('path');
let scriptName = path.basename(__filename);

let initControllers = function(baseRoute, routesHelper){
    fs.readdir(__dirname, (err, controllerPaths) => {
        if(err) throw err;
        for(let ctrlPath in controllerPaths){

            if(ctrlPath === scriptName) continue;
            let controller = require("/" + ctrlPath);
            let routes = controller(baseRoute);

            for(let route in routes){
                routesHelper.initRoute(route);
            }
        }
    });
};

module.exports = initControllers;


