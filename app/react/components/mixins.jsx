var React     = require('react');
var ReactDOM  = require('react-dom');
var request   = require('superagent');
var navigate  = require('react-mini-router').navigate;
var CryptoJS  = require('crypto-js');

var Mixins = {};

Mixins.tokenHistory = {
    expireLoginToken: function(callback) {
        localStorage.setItem('last_login', Math.floor(Date.now() / 1000));
        localStorage.setItem('last_token', window.data.app_info.session_token);
        
        console.log('Last logged in at: ' + localStorage.getItem('last_login'));

        request.get('/session').send().end(function(err, resp) {
            if (!err && typeof resp !== 'undefined' && typeof resp.text !== 'undefined') {
                window.data.app_info.session_token = resp.text;
                
                if (typeof callback !== 'undefined')
                    callback();
            } else {
                //location.reload();
            }
        });
    }
};

Mixins.intervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
      this.intervals.forEach(clearInterval);
  },
  clearInterval: function() {
      this.intervals.forEach(clearInterval);
  }
};

Mixins.formOnLeave = {
    on_leave_init: false,
    initAlert: function() {
        if (this.on_leave_init == false) {
            this.on_leave_init = true;
            console.log('Onleave event initialized');
            
            window.onbeforeunload = function() {
               return 'You have not finished completing this form.';
            }
        }
    },
    initSave: function() {
        if (this.on_leave_init == false) {
            this.on_leave_init = true;
            var parent = this;
    
            window.onbeforeunload = function(){
               var encrypted = CryptoJS.AES.encrypt(JSON.stringify(parent.form_obj), window.data.app_info.session_token);
               
               navigate(window.location.pathname + '?session=' + encodeURIComponent(encrypted));
            }
        }
    },
    checkSave: function() {
        var form_save = helper.getParam('session');
        
        if (typeof form_save !== 'undefined' && form_save !== null) {
            try {
                form_save = decodeURIComponent(form_save);
                form_save = CryptoJS.AES.decrypt(form_save,window.data.app_info.session_token).toString(CryptoJS.enc.Utf8);
                form_save = JSON.parse(form_save);
            } catch(e) {
                return;
            }
            
            navigate(window.location.pathname);
            console.log(form_save);
        }
    },
    cancelLeave: function() {
        this.on_leave_init = false;

        window.onbeforeunload = function(){};
    },
}

Mixins.scrollPoints = {
    componentWillMount: function() {
        if (typeof this.props.parallax !== 'undefined') {
            this.setState({
                parallax: {}
            })
        }
    },
    componentDidMount: function() {
        var points = [];
        var busy   = [];
        
        if (typeof this.props.hit_points !== 'undefined') {
            this.props.hit_points.map(function(item) {
                var el      = ReactDOM.findDOMNode(this.refs[item]);
                var timer   = el.getAttribute('data-delay') || 0;

                points.push({ 
                    point: el.getClientRects()[0].top, 
                    ref: item 
                });
                var obj = {};
                
                obj[item] = false;
                
                setTimeout(function() {
                    this.setState(obj);
                }.bind(this), timer);
            }.bind(this));
        }
        
        if (typeof this.props.parallax !== 'undefined' || typeof this.props.hit_points !== 'undefined') {
            window.addEventListener('scroll', function() {
                if (typeof this.props.parallax !== 'undefined')
                    this.setState({
                        parallax: { margin: (window.pageYOffset / 3) * -1 + 'px 0 0 0' }
                    });
           
                if (this.state.scroll_started == false) {
                    this.setState({
                        scroll_started: true
                    });
                }
                
                if (typeof points !== 'undefined') {
                    points.map(function(item, key) {
                        if (typeof busy[item.ref] == 'undefined') busy[item.ref] = false;
                        
                        if (item !== null && busy[item.ref] !== true) {
                            var el      = ReactDOM.findDOMNode(this.refs[item.ref]);
                            var offset  = el.getAttribute('data-offset') || 0;
                            
                            if (this.state[item.ref] !== true && window.pageYOffset + window.innerHeight - offset > item.point) {
                                console.log('Hit scroll point: ' + item.ref)
                                
                                var timer   = el.getAttribute('data-delay') || 0;
                                var obj     = {};
                                
                                obj[item.ref]   = true;
                                busy[item.ref]  = true;
                                //points[key] = null; // animate once
                                
                                setTimeout(function() {
                                    busy[item.ref] = false;
                                    
                                    this.setState(obj);
                                }.bind(this), timer);
                                
                            } else if (this.state[item.ref] == true && window.pageYOffset + window.innerHeight - offset < item.point) {
                                var obj = {};
                                
                                obj[item.ref] = false;
                                //points[key] = null;
                                
                                this.setState(obj);
                            }
                        } 
                    }.bind(this));
                }
            }.bind(this));
        }
    }
}

Mixins.dataCheck = {
    componentWillMount: function() {
        var oldRender = this.render;
        
        this.render = function () {
          if (typeof window.data._public_profile !== 'undefined') {
              return oldRender();
          } else {
              return this.fail();
          }
        }.bind(this);
    }
}

Mixins.onLoad = {
    getInitialState: function() {
        return {
            loaded: false
        }
    },
    componentDidMount: function() {
        var parent = this;
        
        window.onload = function() {
            parent.setState({
                loaded: true
            })
        }
    }
}

module.exports = Mixins;