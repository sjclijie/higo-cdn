/**
 * Created by Jaylee on 15/8/29.
 */

"use strict";

var urllib = require("urllib");
var formstream = require('formstream');
var utils = require("./utils");

function Higo(options){

    var defaultOptions = {
        kind: "pic",
        ext: "jpg",
        timeout: 36000000,
        uploadUrl: "http://172.16.0.199:8080/pic/fileupload"
    };

    this.options = utils.extend(defaultOptions, options);
}

Higo.create = function(options){
    return new Higo(options);
};

Higo.prototype._request = function(url, options, callback){
    urllib.request(url,  options, function (err, data, res) {

        err = utils.handleResponse(err, data, res);

        if (err) {
            return callback(err, data, res);
        }

        callback(null, data, res);
    });
};

["./up"].forEach(function(name){
    var proto = require(name);
    for (var key in proto){
        Higo.prototype[key] = proto[key];
    }
});

module.exports = Higo;