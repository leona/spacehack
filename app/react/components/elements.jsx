var React      = require('react');
var ReactDOM   = require('react-dom');
var classNames = require('classnames');
var navigate   = require('react-mini-router').navigate;
var Mixins     = require('../components/mixins.jsx');

var Els = {};

Els.navBtn = React.createClass({
    redirect: function() {
        navigate(this.props.redirect);  
    },
    render: function() {
        return (
            <button id={this.props.id} className="btn" onClick={this.redirect}>{this.props.children}</button>
        )
    }
});

Els.btn = React.createClass({
    render: function() {
        return (
            <button id={this.props.id} className="btn" onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
});

Els.tr = React.createClass({
    render: function() {
        var data = this.props.data;

        return (
            <tr>
                {Object.keys(data).map(function(key) {
                    return <td key={key}>{data[key]}</td>
                })}
            </tr>
        )
    }
})

Els.circle = React.createClass({
    render: function() {
        var wrap_class = classNames({
            'circle': true,
            'stat': true
        });

        if (typeof this.props.className !== 'undefined')
            wrap_class += ' ' + this.props.className;

        return (
            <div className={wrap_class} id={this.props.id}>
                <span className={this.props.colour + '-bg'}>{this.props.stat}</span>
                <h3>{this.props.title}</h3>
            </div>
        )
    }
})

Els.rowTitle = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <section className={this.props.className} id={this.props.id}>
                        <h2>{this.props.title}</h2>
                    </section>
                </div>
            </div>
        )
    }
})

Els.progressBar = React.createClass({
    render: function() {
        var arr = Array.apply(null, Array(parseInt(this.props.total))).map(Number.prototype.valueOf,0);

        var parent = this;
        return (
            <div className="progress-bar">
                {arr.map(function(item, key) {
                var _class;

                if (key < parent.props.completed)
                    _class = 'active';

                return <span className={_class} key={key}></span>;
                })}
            </div>
        )
    }
})

Els.loadingAnim = React.createClass({
	render: function() {
		return (
		    <div id="page-load-wrapper">
    		    <div id="page-loader">
        			<div className="uil-squares-css">
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        				<div><div></div></div>
        			</div>
        			<p>{this.props.error_msg}</p>
    			</div>
			</div>
		)
	}
})

Els.captcha = React.createClass({
    render: function() {
        return <div className="g-recaptcha" data-sitekey="6LfgyBkTAAAAAGX0TGgPgJUap_a6r4dN40PCdrgC"></div>;
    }
});

Els.roundImage = React.createClass({
    render: function() {
        return (
            <div style={this.props.style} ref={this.props.ref} className="round-image" id={this.props.id}>
                <Els.img src={window.data.static + this.props.src}/>
            </div>
        );
    }
});

Els.linkImage = React.createClass({
    render: function() {
        return (
            <a href={this.props.href} id={this.props.id}>
                <img className="img-responsive" src={window.data.static + this.props.src}/>
            </a>
        );
    }
});

Els.animStat = React.createClass({
    mixins: [Mixins.intervalMixin],
    getInitialState: function() {
        return { tick: parseInt(this.props.start) };
    },
    componentDidMount: function() {
        console.log('Anim stat mounting');
        
        if (typeof this.props.delay !== 'undefined') {
            setTimeout(function() {
                this.setInterval(this.tick, parseInt(this.props.gap)); 
            }.bind(this), parseInt(this.props.delay));
        }
    },
    tick: function() {
        var increm;
        
        if (this.state.tick >= this.props.end) 
            return this.clearInterval();
        
        if (typeof this.props.skip !== 'undefined' && this.state.tick < this.props.end - this.props.skip) {
            increm = this.props.skip;
        } else {
            increm = 1;
        }
        
        this.setState({ tick: this.state.tick + increm });
    },
    render: function() {
        if (parseInt(this.props.start) == this.state.tick && typeof this.props.active !== 'undefined' && this.props.active == true) {
            this.setInterval(this.tick, parseInt(this.props.gap)); 
        }
        
        return (
            <span>{Helper.numberFormat(this.state.tick)}</span>
        );
    }
});

Els.progressBar = React.createClass({
    getInitialState: function() {
        return {
            progress: typeof this.props.delay == 'undefined' ? this.props.progress : 0
        }
    },
    render: function() {
        var parent = this;
        
        if (typeof this.props.delay !== 'undefined') {
            setTimeout(function() {
                parent.setState({
                    progress: parent.props.progress
                })
            }, parseInt(this.props.delay));
        }
        
        return (
            <div className="progress-bar" id={this.props.id}>
                <div style={{ width: this.state.progress + '%' }}/>
            </div>
        )
    }
})

Els.img = React.createClass({
    getInitialState: function() {
        return {
            opacity: 0,
            class_name: 'opacity-transition',
            start_load: Date.now()
        }
    },
    handleLoad: function() {
        this.setState({
            opacity: 1,
            class_name: this.state.start_load < Date.now() - 100 ? 'opacity-transition' : ''
        });
    },
    render: function() {
        return (
            <img onLoad={this.handleLoad} className={this.state.class_name} style={{ opacity: this.state.opacity }} src={this.props.src}/>
        )
    }
})

Els.fullRow = React.createClass({
    render: function() {
        var row, col;
        
        row = 'row'
        col = 'col-md-12';
    
        if (typeof this.props.reset !== 'undefined') {
            row += ' reset';
            col += ' reset';
        }
        
        return (
            <div className={row}>
                <div className={col}>
                    <div id={this.props.id}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
})

Els.module = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-8 col-md-push-2">
                    <div id={this.props.id} className="module-box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

Els.a = React.createClass({
    handleClick: function(e) {
        //window.location = e.target.href;
    },
    render: function() {
        return (
            <a href={this.props.href} onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
})

Els.parallax = React.createClass({
    componentDidMount: function() {
        //var prev_offset = 0;
       // var direction = 'down';
        
        
        window.onscroll = function() {
            //console.log(window.pageYOffset)
            //document.getElementById('stat').offsetTop // if hit then change state and activate stat counter
            /*
            if (window.pageYOffset < prev_offset) {
                direction = 'up';
            
                this.setState({
                    backdrop_pos: [0, window.pageYOffset / 4],
                })
            } else {*/
                //direction = 'down';
                
                this.setState({
                    backdrop_pos: [0, this.props.offset + window.pageYOffset / this.props.threshold]
                })
            //}
            
            //prev_offset = window.pageYOffset;
        }.bind(this);
    },
    getInitialState: function() {
        return {
            backdrop_pos: [0, this.props.offset],
        };
    },
    render: function() {
        //var classes = this.props.class
        return (
            <div id={this.props.id} className={this.props.className} style={{ backgroundPosition: this.state.backdrop_pos[0] + 'px ' + this.state.backdrop_pos[1] + 'px' }}>
                {this.props.children}
            </div>
        )
    }
});

Els.parallax = React.createClass({
    mixins: [Mixins.scrollPoints],
    getDefaultProps: function() {
        return {
            parallax: true
        }
    },
    render: function() {
        return (
            <img src={this.props.src} style={this.state.parallax} className="parallax-img" />
        )
    }
})
module.exports = Els;