var express = require('express');
var router = express.Router();

/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'my_db'
});

router.get('/', function(req, res, next) {
    connection.query(
      "SELECT id,name,memo, DATE_FORMAT(created_at, '%Y年%m月%d日') as created_at FROM memo",
      (error, results) => {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(results);
      }
    );
});


module.exports = router;