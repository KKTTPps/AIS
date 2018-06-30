var bodyParser = require('body-parser');
var express = require('express');
var router = require('./router');
var ejs = require('ejs');
var path = require('path');
var app = express();


//静态资源
app.use(express.static('public'));

//router调用路由
app.use('/', router);


//服务器监听
var server = app.listen(7799, function() {

    console.log("应用实例，访问地址为" + 7799);

})