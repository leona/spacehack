var helper = function() { return this; };

helper.prototype.setCookie = function(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

helper.prototype.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

helper.prototype.eraseCookie = function(name) {
    this.setCookie(name,"",-1);
}

helper.prototype.emptyArray = function(arr) {
    return typeof arr != "undefined" && arr != null && arr.length > 0;
}


helper.prototype.getDateTime = function(overwrite) {
    if (typeof overwrite !== 'undefined') {
        var now = new Date(overwrite); 
    } else {
        var now = new Date();
    }
    
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

helper.prototype.getParam = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

helper.prototype.inIframe = function() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}


helper.prototype.onConnection = function(callback) {
    var img = new Image();
    
    img.src = 'http://site.com/isup.jpg?' + new Date().getTime();

    img.onload = function() {
        setTimeout(function() {
            callback();
        }, 300);
    };
    
    img.onerror = function() {
        setTimeout(function() {
            onConnection(callback);
        }, 500);
    }
}

helper.prototype.objMerge = function(){
    for (var i=1; i<arguments.length; i++)
       for (var a in arguments[i])
         arguments[0][a] = arguments[i][a];
         
   return arguments[0];
}

helper.prototype.forEach = function(obj, callback) {
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
            callback(key, obj[key]);
        }
    }
}

helper.prototype.random = function(len) {
    var rtn = '';
    var charset = 'QWERTYUIOPASDFGHJKLZCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    
    for(i = 0;i<len;i++) {
        rtn += charset[Math.floor((Math.random() * charset.length) + 1)];
    }
    
    return rtn;
}

helper.prototype.time = function() {
    return Date.now() / 1000;
}

helper.prototype.validateEmail = function(sEmail) {
    //Licensed under a Creative Commons Attribution-ShareAlike 2.5 License
  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string
  
  var reValidEmail = new RegExp(sValidEmail);
  
  if (reValidEmail.test(sEmail)) {
    return true;
  }
  
  return false;
}

helper.prototype.numberFormat = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = new helper;
