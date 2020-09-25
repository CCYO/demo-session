const express = require('express');
const seloginAPI = express.Router();

let isLogin = false;

seloginAPI.get('/', (req, res) => {
    console.log("進入訪客頁");
    let name = 'guest';
    isLogin = false;
    let logtime = 1;
    if(req.session.firstName && req.session.lastName){
        console.log("會員登入次數");
        name = req.session.firstName + ' ' + req.session.lastName
        isLogin = true;
        logtime = req.session.times;
    }
    res.render('index', {title: 'Express', member: name, logstatus: isLogin, time: logtime})
})

seloginAPI.post('/post', (req, res) => {
    if(req.body.firstName=="" || req.body.lastName=="")
    {
        return res.redirect('/login.html')
    }
    else if(req.body.firstName == req.session.firstName
            && req.body.lastName == req.session.lastName)
    {
        console.log("重覆登入")
        req.session.times++;
        return res.redirect('/session');
    }
    else
    {
        console.log("新資料")
        req.session.firstName = req.body.firstName
        req.session.lastName  = req.body.lastName
        return res.redirect('/session');
    }    
})

seloginAPI.get('/logout', (req, res) => {
    console.log("登出");
    req.session.destroy();
    return res.redirect('/session')
})

module.exports = seloginAPI;