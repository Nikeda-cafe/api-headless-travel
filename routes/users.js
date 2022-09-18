var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const conditionId = req.query.id;
    const attributes = { attributes: ["id", "name", "mail", "age", ["DATE_FORMAT(createdAt, '%Y年%m月%d日')", "createdAt"]] }
    const wheres = conditionId ? { where: { id: conditionId } } : {}
    const conditions = Object.assign(attributes,wheres)
    db.User.findAll(conditions).then(users => {
        const data = {
            title: 'Users/Index',
            content: users
        }
        res.render('users/index',data)
    })
});

module.exports = router;
