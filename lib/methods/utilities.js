var utilities = {}

utilities.debug = function(msg) {
    //console.log(msg);
}

utilities.log = function(key, obj) {
    //console.log(obj);
}


utilities.objMerge = function(){
    for (var i=1; i<arguments.length; i++)
       for (var a in arguments[i])
         arguments[0][a] = arguments[i][a];
         
   return arguments[0];
}

utilities.forEach = function(obj, callback) {
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           //var obj = obj[key];
            callback(key, obj[key]);
        }
    }
}

utilities.defined = function(val) {
    if (typeof val !== 'undefined' && val.length > 0) return true;
}

utilities.random = function(len) {
    var rtn = '';
    var charset = 'QWERTYUIOPASDFGHJKLZCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    
    for(i = 0;i<len;i++) {
        rtn += charset[Math.floor((Math.random() * charset.length) + 1)];
    }
    
    return rtn;
}

utilities.time = function() {
    return Date.now() / 1000;
}
module.exports = utilities;