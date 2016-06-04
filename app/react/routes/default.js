var React = require('react')
var constants = require('../opts/constants')
var Link = require('react-router').Link

var Root = React.createClass({
    childContextTypes: {
        frame_height: React.PropTypes.integer
    },
    getChildContext: function() {
        return this.state    
    },
    getInitialState: function() {
        return {}
    },
    render: function() {
        return (
            <div className="container-fluid">
                <Header/>
                
                <div className="row">
                    <Plan title="small house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                    <Plan title="big house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                    <Plan title="big house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                    <Plan title="big house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                    <Plan title="big house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                    <Plan title="big house" img="http://previewcf.turbosquid.com/Preview/2014/05/24__01_49_45/American_Neighborhood_house_08_SW_view.jpged30d9f8-779c-4879-b6b1-4154523a29c1Larger.jpg"/>
                </div>
                
                <Footer/>
            </div>
        )
    }
});

var Header = React.createClass({
    render: function() {
        return (
    		<div className="row">
    			<header>
    				<div className="col-md-3 col-md-push-1">
    				    <img height="30" src="https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png"/>
    					<h1><span>Global</span> space</h1>
    				</div>
    				<div className="col-md-4 pull-right">
    					<nav>
    						<ul>
    							<li><a href="home">home</a></li>
    							<li><a href="cs">customize</a></li>
    							<li><a href="customize">about</a></li>
    							<li><a href="customize">contact</a></li>
    						</ul>
    					</nav>
    				</div>
    			</header>
    		</div>
        )
    }
})

var Footer = React.createClass({
    render: function() {
        return (
            <div className="row">
                <footer>
                    <div className="col-md-3">
                        <span>Global space ©</span>
                    </div>
                </footer>
            </div>
        )
    }
})

var Plan = React.createClass({
    getInitialState: function() {
        return {
            active: false
        }    
    },
    onClick: function(e) {
        e.preventDefault();
        
        this.setState({
            active: !this.state.active
        })
    },
    render: function() {
        return (
			<div className={'width-transition ' + (this.state.active == false ? 'col-md-3' : 'col-md-6')}>
				<div className={"plan-container" + (this.state.active ? ' active' : '')}>
					<div className="plan-title">
						<h3>{this.props.title}</h3>
					</div>
					<div className="plan-content">
						<img src={this.props.img}/>
						
						<div className="side-content">
						    <h3>Resources</h3>
						    <a className="back-button" href="back">← Back</a>
                            <ul className="plan-resources">
                                <li><button>Materials</button></li>
                                <li><button>Guide</button></li>
                                <li><button>advice</button></li>
                                <li><button>Guide</button></li>
                            </ul>
                        </div>
						<div className="plan-actions">
							<a href="customize">customize</a>
							<a href="download" onClick={this.onClick}>view</a>
						</div>
					</div>
				</div>
			</div>
        )
    }
})
module.exports = function() {
    return <Root/>
};
