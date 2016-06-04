var React = require('react');

var Error = React.createClass({
    render: function() {
        return (
            <div id="wrapper" className="center-all">
                <h1>Error</h1>
            </div>
        )
    }
});

module.exports = function() {
    return <Error/>
};
