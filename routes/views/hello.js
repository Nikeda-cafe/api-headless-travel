const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    let msg = '入力した内容'
    if(req.session.message !== undefined){
        msg = `Last message : ${req.session.message}` 
    }
    const data = {
        msg: msg
    }
    res.render('hello',data) 
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