/* global browser */
var React = require('react')
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var App =  require('./routes/default')

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.body);
