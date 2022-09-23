var express = require('express');
const db = require('../../models');
var router = express.Router();

/* GET users listing. */

// login
router.get('/login', function(req,res,next){
    if(req.isLogin){
        res.redirect('/information')  
    }
    const metaData = {
        title:'ログイン',
        h1: 'ログイン',
    }
    const data = {
        metaData: metaData
    }
    res.render('users/login',data)
})

router.post('/login', function(req,res,next){
    const metaData = {
        title:'ログイン',
        h1: 'ログイン',
    }
    db.User.findOne({
        where:{
            mail: req.body.email,
            pass: req.body.pass
        }
    }).then(user => {
            if(user !== null){
                req.session.login = user
                let redirectPage = req.session.redirectPage;
                if(redirectPage === undefined){
                    redirectPage = '/information'
                }
                res.redirect(redirectPage);
            }else{
                const data = {
                    metaData: metaData,
                    message: 'メールアドレスかパスワードが正しくありません'
                }
                res.render('users/login',data)
            }
    })
})

// regist
router.get('/regist', function(req, res, next) {
    const metaData = {
        title:'ユーザー登録',
        h1: 'ユーザー登録',
    }
    const data = {
        metaData:metaData
    }
    res.render('users/regist',data)
});

router.post('/regist', function(req, res, next) {
    db.sequelize.sync().then(() => {
        db.User.create({
            name: req.body.name,
            pass: req.body.pass,
            mail: req.body.email,
            
        }).then(model => {
            res.redirect('/users/complete')
        })
    })
    // const data = {}
    // res.render('information/regist',data)
});

// edit
router.get('/edit', function(req, res, next) {
    const queryId = req.query.id ? req.query.id : ''
    db.information.findAll({ where: { id: queryId } }).then(result => {
        const metaData = {
            title:'ユーザー情報編集',
            h1: 'ユーザー情報編集',
        }
        const data = {
            metaData: metaData,
            post: result[0],
        }
        res.render('information/edit',data)
    })
    
    
});

router.post('/edit', function(req, res, next) {
    const queryId = req.query.id ? req.query.id : ''
    db.sequelize.sync().then(() => {
        db.User.update(
            {
                name: req.body.name,
                pass: req.body.pass,
                mail: req.body.email,
                
            },
            {
                where: { id: queryId }
            }
        ).then(model => {
            res.redirect('/users/complete')
        })
    })
});

// complete
router.get('/complete', function(req, res, next) {
    const metaData = {
        title:'ユーザー登録完了',
        h1: 'ユーザー登録完了',
    }
    const data = {
        metaData: metaData
    }
    res.render('users/complete',data)
});
module.exports = router;
