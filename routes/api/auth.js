const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../models');
const saltRounds = 10;

router.post('/regist', function(req, res, next) {
    const idLength = 5;
    const idSource = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < idLength; i++){
        id += idSource[Math.floor(Math.random() * idSource.length)];
    }
    const { name, email, pass } = req.body;
    console.log(pass);
    console.log(saltRounds);
    const hassedPassword = bcrypt.hashSync(pass, saltRounds);
    db.sequelize.sync().then(() => {
        db.Customer.create({
            name: name,
            email: email,
            pass: hassedPassword,
        }).then(model => {
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send({"message":"complete create customer"});
        }).error(error => {
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send({"message":error});
        })
    })
});


module.exports = router;