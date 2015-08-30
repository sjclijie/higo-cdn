/**
 * Created by Jaylee on 15/8/30.
 */

"use strict";

var fs = require("fs");
var formstream = require("formstream");
var urllib = require("urllib");
var utils = require("./utils");

exports.uploadFile = function(filepath, options, callback){

    if (typeof options === "function"){
        callback = options;
        options = null;
    } else {
        utils.extend(this.options, options)
    }

    var that = this;

    fs.readFile(filepath, function(err, data){

        if ( err ){
            callback(err);
        } else {
            var form = formstream();
            var kind = that.options.kind;
            var ext = that.options.ext;
            delete that.options.kind;
            delete that.options.ext;
            form.buffer('file', data, "aaa");
            form.field('kind', kind).field('ext', ext);

            that.upload(form, callback);
        }
    });
};

exports.upload = function (content, callback) {

    var reqOptions = {
        headers: content.headers(),
        method: 'POST',
        stream: content,
    };

    var url = this.options.uploadUrl;

    delete this.options.uploadUrl;

    var options = utils.extend(reqOptions, this.options);

    this._request( url, options, callback );
};