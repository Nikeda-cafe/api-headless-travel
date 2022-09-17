const express = require('express')
const router = express.Router()

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'my_db'
});

router.get('/',(req,res,next) => {
    connection.query(
        "SELECT id,name,memo, DATE_FORMAT(created_at, '%Y年%m月%d日') as created_at FROM memo",
        (error, results) => {
            console.log(results);
            res.render('hello/index',{result:results});
        }
    );
})


router.post('/post',(req,res,next) => {
    let msg = req.body['msg']
    req.session.message = msg
    var data = {
        msg: `Last message : ${req.session.message}` ,
    }
    res.render('hello',data) 
})


module.exports = router;