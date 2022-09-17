var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll().then(users => {
    const data = {
      title: 'Users/Index',
      content: users
    }
    res.render('users/index',data)
  })
});

module.exports = router;
