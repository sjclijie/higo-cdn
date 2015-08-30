/**
 * Created by Jaylee on 15/8/30.
 */

exports.extend = function(target, source){

    target = target || {};

    for(var prop in source){

        if (typeof source[prop] === 'object'){
            target[prop] = extend(target[prop], source[prop]);
        } else {
            target[prop] = source[prop];
        }
    }

    return target;
}

exports.handleResponse = function(err, data, res){

    if (err) {
        return err;
    }

    var httpCode = res.statusCode;

    if ( httpCode >= 400 ){
        return exports.createError(httpCode, "http error", "Http Error: " + httpCode);
    }

    var data = JSON.parse(data.toString());

    var retCode = data.ret;

    if ( retCode != 0 ){
        return exports.createError(retCode, "ret error" , data.msg);
    }
}

exports.createError = function(statusCode, name, msg){

    var err = new Error( msg );

    err.code = statusCode;
    err.name = name;

    return err;
}