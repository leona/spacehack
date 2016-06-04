var React      = require('react');
var ReactDOM   = require('react-dom');
var classNames = require('classnames');

var Forms = {};

Forms.input = React.createClass({
    getInitialState: function() {
        return {
            error: typeof this.props.error !== 'undefined' ? this.props.error : null
        }
    },
  render: function() {
         var field_classes = classNames({
                'form-group': true,
              'error': typeof this.props.error !== 'undefined' && this.props.error !== 'false' ? true : false
        });

    return (
        <fieldset className={field_classes}>
            <input {...this.props}/>
            <label className="err-msg">{this.props.error}</label>
        </fieldset>
    )
  }
});

Forms.checkbox = React.createClass({//maybe a fieldSetLabelled
  render: function() {
    return (
        <label className="form-group">
            <input name={this.props.name} type="checkbox"/>
            <span>{this.props.title}</span>
        </label>
    )
  }
});

module.exports = Forms;