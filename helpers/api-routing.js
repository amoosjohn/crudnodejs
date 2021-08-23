import path from 'path';
import fs from 'fs';

let route = function (app,config){
    return function(req,res,next){

        //Params
        var apiVersion = req.params.version;
        var controller = req.params.controller;
        var method = req.params.method;
        var controllerPath = '';

        //make controller a path
        controllerPath = path.normalize(`${config.root_path}/api/v${config.root_path}/${controller}/${controller}.controller.js`);
        console.log('controllerPath',controllerPath)

        if(fs.existsSync(controllerPath)) { //check if controller exists
            if(method == null) {
                //Go to root path
                next();
            }
            else {
                var fns = require(controllerPath);
                if(typeof fns[method] === 'function') {
                    return fns[method](req,res,next);
                }
                else {
                    return res.status(400).json({message : 'no method found'});
                }
            }

        }
        else {
            return res.status(400).json({message : 'no endpoint found',code: 400});
        }
    }
}

module.exports = {
    route
}