"use strict";

var React    = require('react');
var ReactDOM = require('react-dom');
var uti      = require('util');
var request  = require('superagent');
var Mixins   = require('./mixins.jsx');

var Ajax = {};
/*
Ajax.form = React.createClass({
    mixins: [Mixins.formOnLeave],
    validation: null,
    callback: null,
    form_obj: { csrfmiddlewaretoken: window.data.app_info.session_token },
    handleSubmit: function(e){
        e.preventDefault();
        var parent = this;

        if (this.validation !== null) {
            this.validation(this.form_obj, function(resp) {
                if (resp == true) {
                    parent.send();
                }
            });
            
            return;
        } else {
            //do precallback then make ajax request
            this.send();
        }
    },
    send: function() {
        this.cancelLeave();
        
        Ajax.send(this.props.action, this.form_obj, this.props.callback);
    },
    handleChange: function(e) {
        this.initAlert();
        
        this.form_obj[e.target.name] = e.target.value;
    },
    render: function() {
        var parent = this;

        return (
            <form action={this.props.action} className={this.props.class} onSubmit={this.handleSubmit} method="POST">
                {this.validation = this.props.validate}
                {this.callback   = this.props.callback}

                {React.Children.map(this.props.children, function(item) {
                    if (item.props.name !== null)
                        parent.form_obj

                    return React.cloneElement(item, { onChange: parent.handleChange });
                })}
            </form>
        )
    }
});
*/
Ajax.send = function(action, data, callback) {
    request.post('/ajax/' + action +'/')
        .send(data)
        .set('X-CSRFToken', window.data.app_info.session_token)
        .end(function(err, resp) {
            if (typeof resp == 'undefined' || typeof resp.statusCode == 'undefined') {
                if (err)
                    console.log(err);

                return console.log('Server error submitting form');
            }

            resp['data_loaded'] = true;

            callback(err, resp);
        });
}

Ajax.get = function(action, callback, error) {
    request.post('/ajax/' + action +'/')
        .send()
        .set('X-CSRFToken', window.data.app_info.session_token)
        .end(function(err, resp) {
            if (typeof resp == 'undefined' || typeof resp.statusCode == 'undefined') {
                if (err)
                    console.log(err);

                error();
                return console.log('Server error submitting form');
            }
            
            if (resp.body == null && resp.text !== null) {
                try {
                    resp.body = JSON.parse(resp.text);
                } catch(e) {
                    console.log('Error parsing response:');
                    console.log(e);
                }
            }
            
            if (resp.statusCode == 200 || resp.statusCode == 302 || resp.statusCode == 403) {
                callback(err, resp);
            } else {
                error();
            }
        });
}


module.exports = Ajax;
