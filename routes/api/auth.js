const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../models');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

router.post('/regist', function(req, res, next) {
    const idLength = 5;
    const idSource = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < idLength; i++){
        id += idSource[Math.floor(Math.random() * idSource.length)];
    }
    const { name, mail, pass } = req.body;
    console.log(pass);
    console.log(saltRounds);
    const hassedPassword = bcrypt.hashSync(pass, saltRounds);
    db.sequelize.sync().then(() => {
        db.Customer.create({
            name: name,
            mail: mail,
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

router.post('/login', function(req, res, next) {
    const { mail, pass } = req.body;
 
    db.Customer.findOne({
        where:{
            mail: mail,
        }
    }).then(customer => {
        if(customer !== null){
            bcrypt.compare(pass, customer.pass, function (error, results) {
                if (error) {
                    return res.status(400).json({
                        error: error.message,
                    });
                }
                if (!results) {
                    return res.json({
                        message: "password is not correct",
                    });
                }
                //Tokenの発行　書き換え
                const payload = {
                    id: customer.id,
                    name: customer.name,
                    mail: customer.mail,
                };
                const token = jwt.sign(payload, "secret");
                return res.json({ token });
            });
        }
    })
});

//Token確認API
router.get('/customer', (req, res) => {
    const bearToken = req.headers['authorization'];
    console.log(bearToken);
    // const bearer = bearToken.split(' ');
    // const token = bearer[1];
    // console.log(token);
    jwt.verify(bearToken, 'secret', (error, customer) => {
        if (error) {
            return res.sendStatus(403);
        } else {
            return res.json({
            customer,
            });
        }
    });
});


module.exports = router;