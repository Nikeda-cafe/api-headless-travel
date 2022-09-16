const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    var data = {
        title: 'Hello',
        content: 'vfs;vm;slm'
    }
    res.render('hello',data) 
})

module.exports = router;