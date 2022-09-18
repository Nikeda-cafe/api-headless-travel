var express = require('express');
const db = require('../../../models');
var router = express.Router();

/* GET users listing. */

// list 
router.get('/', function(req, res, next) {
    const data = {}
    res.render('information/index',data)
});

// regist
router.get('/regist', function(req, res, next) {
    const msg = db.information.returnHello();
    console.log(msg);
    const data = {}
    res.render('information/regist',data)
});

router.post('/regist', function(req, res, next) {
    // console.log(req.body['title']); 
    const data = {}
    res.render('information/regist',data)
});

// edit
router.get('/edit', function(req, res, next) {
    const data = {}
    res.render('information/edit',data)
});

router.post('/edit', function(req, res, next) {
    const data = {}
    res.render('information/edit',data)
});

module.exports = router;