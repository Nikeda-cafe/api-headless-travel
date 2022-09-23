var express = require('express');
var router = express.Router();
const db = require('../../models');

// sequelize オブジェクト呼び出し
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

router.get('/',function(req, res, next) {
    const limit = req.query.limit ?? ''
    const id = req.query.id ?? ''

    // columns
    const queryDate = `DATE_FORMAT(i.createdAt,'%Y.%m.%d') as createdAt`
    const columns = ["i.id", "i.content", "ic.name as category", "i.title", "i.status", "i.emergency_flag", queryDate]

    // join
    const join = ["inner join information_categories as ic on i.group_id = ic.id"]

    // limit
    const queryLimit = limit !== '' ? `limit ${limit}` : ''

    // order
    const queryOrder = `order by "createdAt"`

    // where
    const where = [];
    where.push(`i.delete_flag = 0`);
    where.push(`i.status = 1`);
    if(id !== ''){
        console.log(id);
        where.push(`i.id = ${id}`)
    }
    sequelize.query(
        `SELECT ${columns.join(',')} 
        FROM information AS i 
        ${join.join(' ')} 
        WHERE ${where.join(' AND ')} 
        ${queryOrder} 
        ${queryLimit} `
    )
    .then(result => {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(result[0]);
    });
});

module.exports = router;
