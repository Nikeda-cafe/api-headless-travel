var express = require('express');
var router = express.Router();

/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */

var { Client } = require('pg');
var client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'my_db',
    password: 'postgres',
    port: 5432
})
 
client.connect()

router.get('/', function(req, res, next) {
    const query = {
        text: 'select * from information_categories',
    }
    client.query(query, (error, result) => {
        if(error){

        }else{
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send(result.rows);
        }
      }
    );
});


module.exports = router;