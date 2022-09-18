var express = require('express');
// const db = require('../../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const data = {}
    res.render('information/index',data)
});

module.exports = router;