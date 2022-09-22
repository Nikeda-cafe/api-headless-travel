var express = require('express');
var router = express.Router();
const db = require('../../../models');
const MarkDownIt = require('markdown-it')
const mdi = new MarkDownIt() 

// sequelize オブジェクト呼び出し
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* GET users listing. */
// list 
router.get('/',function(req, res, next) {
    console.log(req.isLogin);
    // if(!req.isLogin){
    //     res.redirect('/users/login')
    // }
    const metaData = {
        title:'お知らせ一覧',
        h1: 'お知らせ一覧',
    }

    const postData = {
        id: '',
        category:'',
        status: '',
        emergency: ''
    }

    // columns
    const queryDate = `to_char(i."createdAt",'yyyy年mm月dd日') as "createdAt"`
    const columns = ["i.id", "ic.name as category", "i.title", "i.status", "i.emergency_flag", queryDate]
    // join
    const join = ["inner join information_categories as ic on i.group_id = ic.id"]
    sequelize.query(`select ${columns.join(',')} from information as i ${join.join(' ')}`)
        .then(result => {
            const data = {
                metaData:metaData,
                list: result[0],
                postData: postData,
                userSession: req.session.login
            }
            res.render('information/index',data)
        }
    );
});

// list 
router.post('/', function(req, res, next) {
    if(!req.isLogin){
        res.redirect('/users/login')
    }
    const id = req.body.id ? req.body.id : ''
    const category = req.body.category ? req.body.category : ''
    const status = req.body.status ? req.body.status : ''
    const emergency = req.body.emergency === 'on' ? 1 : ''
    const postData = {
        id: id,
        category:category,
        status: status,
        emergency: emergency
    }

    const metaData = {
        title:'お知らせ一覧',
        h1: 'お知らせ一覧',
    }

    // where
    const where = ["1 = 1"]
    if(id !== ''){
        where.push(`i.id = ${id}`)  
    }
    if(category !== ''){
        where.push(`i.group_id = ${category}`)
    }
    if(status !== ''){
        where.push(`i.status = ${status}`)
    }
    if(emergency !== ''){
        where.push(`i.emergency_flag = ${emergency}`)
    }
    // columns
    const queryDate = `to_char(i."createdAt",'yyyy年mm月dd日') as "createdAt"`
    const columns = ["i.id", "ic.name as category", "i.title", "i.status", "i.emergency_flag", queryDate]  
    // join
    const join = ["inner join information_categories as ic on i.group_id = ic.id"]
    sequelize.query(`SELECT ${columns.join(',')} FROM information as i ${join.join(' ')} WHERE ${where.join(' AND ')}`)
        .then(result => {
            const data = {
                metaData:metaData,
                list: result[0],
                postData: postData,
                userSession: req.session.login
            }
            res.render('information/index',data)
        }
    );
});

// regist
router.get('/regist', function(req, res, next) {
    if(!req.isLogin){
        res.redirect('/users/login')
    }
    const metaData = {
        title:'お知らせ登録',
        h1: 'お知らせ登録',
    }
    const data = {
        metaData:metaData
    }
    res.render('information/regist',data)
});

router.post('/regist', function(req, res, next) {
    if(!req.isLogin){
        res.redirect('/users/login')
    }
    db.sequelize.sync().then(() => {
        db.information.create({
            title: req.body.title,
            group_id: req.body.group,
            content: req.body.content,
            status: req.body.status,
            emergency_flag: req.body.emergency ? 1 : 0,
            
        }).then(model => {
            res.redirect('/information/complete')
        })
    })
    // const data = {}
    // res.render('information/regist',data)
});

// edit
router.get('/edit', function(req, res, next) {
    if(!req.isLogin){
        res.redirect('/users/login')
    }
    const queryId = req.query.id ? req.query.id : ''
    db.information.findAll({ where: { id: queryId } }).then(result => {
        const metaData = {
            title:'お知らせ情報編集',
            h1: 'お知らせ情報編集',
        }
        const data = {
            metaData: metaData,
            post: result[0],
        }
        res.render('information/edit',data)
    })
    
    
});

router.post('/edit', function(req, res, next) {
    if(!req.isLogin){
        res.redirect('/users/login')
    }
    const queryId = req.query.id ? req.query.id : ''
    db.sequelize.sync().then(() => {
        db.information.update(
            {
                title: req.body.title,
                group_id: req.body.group,
                content: req.body.content,
                status: req.body.status,
                emergency_flag: req.body.emergency ? 1 : 0,
                
            },
            {
                where: { id: queryId }
            }
        ).then(model => {
            res.redirect('/information/complete')
        })
    })
});

// complete
router.get('/complete', function(req, res, next) {
    const metaData = {
        title:'お知らせ登録完了',
        h1: 'お知らせ登録完了',
    }
    const data = {
        metaData: metaData
    }
    res.render('information/complete',data)
});

module.exports = router;