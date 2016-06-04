var React      = require('react');
var ReactDOM   = require('react-dom');
var classNames = require('classnames');

var Section = {};

Section.title = React.createClass({
    render: function() {
        return (
            <section className={this.props.className} id={this.props.id}>
                <h2>{this.props.title}</h2>
            </section>
        )
    }
});


Section.wrapTitle = React.createClass({
    render: function() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <Section.title className="wrap-title" title={this.props.title}/>
                <section className="wrap-content">
                {this.props.children}
            </section>
        </div>
        )
    }
})

module.exports = Section;