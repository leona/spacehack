var request = require('superagent');

var test_url = ''
var requests = 20;

for(var i = 0;i < requests;i++) {
    var binder = { calc: 0, count:0, start: Date.now(), end: requests }
    request.get(test_url).end(function(err, res){
        if (err) console.log(err);

        this.calc = Date.now() - this.start
        this.count = this.count + 1
        //console.log(this.calc)
        //console.log(this.count);
        //console.log(this.end);
        if (this.count >= this.end - 1) {
            //console.log('Average: ' + this.calc / requests.length)
        }
        console.log(Date.now() - this.start)
        //console.log(this.calc)
            //console.log('Average: ' + this.calc / store.length)
    
    }.bind(binder));
}