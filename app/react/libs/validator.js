var helper = require('./helpers');

var validator = function(values, rules, callback, labels) { 
    this.values     = values;
    this.rules      = rules;
    this.exceptions = {};
    this.len_store  = {};
    this.rule_store = {};
    
    if (typeof labels !== 'undefined' && labels !== null)
        this.labels = labels;

    this.mergeLabels();
    this.runChecks();

    return callback(Object.keys(this.exceptions).length == 0 ? true : this.exceptions)
}

validator.prototype.runChecks = function() {
    var parent = this;
    console.log('Running form validation checks');
    helper.forEach(this.rules, function(key, item) {
        if (typeof parent.values[key] == 'undefined')
            parent.values[key] = '';
    });

    helper.forEach(this.values, function(key, item) {
        if (typeof parent.rules[key] !== 'undefined') {
            var input_rules = parent.rules[key].split('|');

            input_rules.map(function(_item, _key) {
                var fail = false;
                
                if (parent.parseCheck(_item, item, key) == true) 
                    parent.addException(key, _item);
            })
        }
    })
}

validator.prototype.parseCheck = function(rule, value, key) {
    var fail = false;

    switch(rule) {
        case 'required':
            if (this.notDefined(value) || value == '') 
                fail = true;
        break;
        case 'email':
            if (helper.validateEmail(value) == false) {
                fail = true;
            }
        break;
        default:
            if (!this.notDefined(value)) {
                var split = rule.split('-');
                var split_value = parseInt(split[1]);
                
                if (split[0] == 'min') {
                    if (value.length < split_value) {
                        this.rule_store[key] = split[0];
                        fail = true;
                        this.addLen(key, 'min', split_value);
                    }
                } else if (split[0] == 'max') {
                    if (value.length > split_value) {
                        this.rule_store[key] = split[0];
                        fail = true;
                        this.addLen(key, 'max', split_value);
                    }
                }
            }
        break;
    }

    return fail;
}

validator.prototype.notDefined = function(value) {
    return typeof value == 'undefined' || value == null || value == '';
}

validator.prototype.addLen = function(key, type, len) {
    if (typeof this.len_store[key] == 'undefined')
        this.len_store[key] = {};

    this.len_store[key][type] = len;
}

validator.prototype.addException = function(name, rule) {
    var label;
    
    console.log('Adding exception for:  ' + name + ' Because: ' + rule);
    
    if (typeof this.exceptions[name] == 'undefined')
        this.exceptions[name] = [];

    if (this.rule_store[name] == 'max') {
        label = this.labels.max.replace('{x}', this.len_store[name].max);
    } else if (this.rule_store[name] == 'min') {
        console.log(1);
        console.log(name);
        console.log(this.rule_store[name]);
        console.log(1);
        label = this.labels.min.replace('{x}', this.len_store[name].min);
    } else {
        label = this.labels[rule];
    }

    this.exceptions[name].push(label);
}

validator.prototype.mergeLabels = function() {
    var labels = {
        required: 'Please fill in this field correctly',
        min: 'Please enter at least {x} characters',
        max: 'No more than {x} characters allowed',
        email: 'This is an invalid email address'
    }

    if (this.labels !== 'undefined') {
        helper.forEach(this.labels, function(item, key) {
            if (typeof labels[key] !== 'undefined') {
                labels[key] = item;
            }
        });
    }

    this.labels = labels;
}

module.exports = validator;