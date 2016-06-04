var uti = require(__methods + 'utilities');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.reacter('index', 'default', {
        page_title: 'Global space'
    });
});


module.exports = router;