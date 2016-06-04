var app     = require(__base + 'app');
var config  = require(__base + 'config');
var path    = require('path');
var uti     = require(__methods + 'utilities');
var React           = require('react');
var ReactDomServer  = require('react-dom/server');
var html = require('html');
require('node-jsx').install();

app.use(function(req, res, next) {
  res.locals = config
  next();
});

// Determine if static request
if (uti.defined(config.asset_host) && uti.defined(config.asset_exts)) {
  app.use(function(req, res, next) {
    if (req.get('host') == config.asset_host) {
      if (config.asset_exts.indexOf(path.extname(req.originalUrl)) == -1) {
        return res.end();
      }
    } 
    next();
  });
}

// Determine if ajax request
app.use(function(req, res, next) {
  if (typeof req.body !== 'undefined' && typeof req.body.ajax_request !== 'undefined' && req.body.ajax_request == 'true') {
    req.isAjax = true;
  } else {
    req.isAjax = false;
  }
  next();
});

// Log requests
app.use(function(req, res, next) {
  uti.log('access-log', {
    ip: req.headers['x-forwarded-for'],
    request: req.originalUrl,
    method:  req.method,
    'user-agent': req.headers['user-agent'],
    time: Date.now()
  });

  next();
});


//Check if visitor is a crawler
app.use(function(req, res, next) {
  req.crawler = req.headers['user-agent'].match('/bot|crawl|slurp|spider/i') ? true : false;

  next();
})

var markup_cache = [];

//React markup rendering
app.use(function reactRender(req, res, next) {
  res.reacter = function(template, comp, data) {
    if (__env !== 'dev') {
      if (typeof markup_cache[comp] == 'undefined') {
        //TODO: check if data expired and recache
        global.window = { data: data }
    
        var component       = React.createFactory(require(__react + 'routes/' + comp));
        markup_cache[comp]  = html.prettyPrint(ReactDomServer.renderToString(component({})))
      }
    }
    
  

    data = {
      data: data,
      markup: markup_cache[comp],
      raw_data: JSON.stringify(data),
      locals: res.locals
    };

    res.render(template, data);
  }
  
  next();
});

function enableCORSMiddleware(req,res,next) {
   // You could use * instead of the url below to allow any origin, 
   // but be careful, you're opening yourself up to all sorts of things!
   res.setHeader('Access-Control-Allow-Origin',  "http://localhost:8888");
   next()
}