var express = require('express');
const db = require('../../../models');
var router = express.Router();

/* GET users listing. */

// list 
router.get('/', function(req, res, next) {
    const conditionId = req.query.id;
    const attributes = { attributes: ["id", "group_id", "title", "status", "emergency_flag", ["DATE_FORMAT(createdAt, '%Y年%m月%d日')", "createdAt"]] }
    const wheres = conditionId ? { where: { id: conditionId } } : {}
    const conditions = Object.assign(attributes,wheres)
    db.information.findAll(conditions).then(result => {
        const data = {
            list: result
        }
        res.render('information/index',data)
    })
});

// regist
router.get('/regist', function(req, res, next) {
    const msg = db.information.returnHello();
    console.log(msg);
    const data = {}
    res.render('information/regist',data)
});

router.post('/regist', function(req, res, next) {
    console.log(req.body); 
    db.sequelize.sync().then(() => {
        db.information.create({
            title: req.body.title,
            group_id: req.body.group,
            content: req.body.content,
            status: req.body.status,
            emergency_flag: req.body.emergency ? 1 : 0,
            
        }).then(model => {
            res.redirect('/information/regist')
        })
    })
    // const data = {}
    // res.render('information/regist',data)
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