var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


router.post('/', function(req, res, next) {
    const sendName = req.query.name ?? ''
    const sendEmail = req.query.email ?? ''
    const sendComment = req.query.comment ?? ''
    const data = {
        to: process.env.MAIL_TO,
        text: `FROM[${sendEmail}]\n\n${sendName}様\n\n${sendComment}`,
        subject: 'Headless-Travelから問い合わせがありました',
    };
      
    transporter.sendMail(data, (error, info) => {
      
        if(error) {
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send({"message":error});
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send({"message":"complete sendmail"});
        }
      
    });
});


module.exports = router;