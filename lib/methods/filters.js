var dateFormat = require('dateformat');

module.exports = function() {
    
    function app() { 
        this.output;
        
        return this;
    }
    
    app.prototype.tagGroups = function(tags, data) {
        var output = typeof data !== 'undefined' ? data : this.output;
        
        for(var key in data) {
            for(var key_2 in tags) {
                if (data[key].venue_tags.indexOf(tags[key_2]) > -1) {
                    if (typeof output[tags[key_2]] == 'undefined') output[tags[key_2]] = [];
                    output[tags[key_2]].push(data[key]);
                }
            }
        }
        
        this.output = output;
        return this;
    }
    
    app.prototype.dateConvert = function(data) {
        var data = typeof data !== 'undefined' ? data : this.output;

        for(var key in data) {
            var full = dateFormat(data[key].start, "[] {} dS h:MMTT");

            var phase2 = full.replace('{}', dateFormat(data[key].start, 'mmmm').substring(0, 3));
            data[key].start = phase2.replace('[]', dateFormat(data[key].start, 'dddd').substring(0, 3));
        }
        
        this.output = data;
        return this;
    }
    
    app.prototype.listOrdered = function(data) {
        var list = typeof data !== 'undefined' ? data : this.output;
        
        for(var key in data) {
            if (data[key].events.length > 0)
                list = list.concat(data[key].events);
        }
        
        list.sort(function(a, b) {
            var c = new Date(a.start);
            var d = new Date(b.start);
            return d-c;
        })
        
        this.output = list;
        return this;
    }
    
    app.prototype.clean = function() {
        var new_rtn = [];
        for(var key in this.output) {
            var pic = this.output[key].event_picture;
            
            if (typeof pic !== 'undefined' && typeof pic.length !== 'undefined' && pic.length > 0) {
                  new_rtn.push(this.output[key]); 
            }
        }
        this.output = new_rtn;
        return this;
    }
    app.prototype.between = function(between, data) {
        var output = typeof data !=='undefined' ? data : this.output;
        
        for(var key in data) {
            if (data[key].start > between[0] && data[key].start < between[1]) {
                output.push(data[key]);
            }
        }
        
        this.output = output;
        return this;
    }
    return app;
}()