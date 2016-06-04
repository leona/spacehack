var dateformat = require('dateformat');

var manip = function() { return this; };

manip.prototype.profile = function(data) {
    data.last_session.date_started = dateformat(data.last_session.date_started, 'h:MMtt dddd, mmmm dS yyyy');
    
    return data;
}

module.exports = new manip;