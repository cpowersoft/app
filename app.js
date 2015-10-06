/**
* Module dependencies.
*/

var express = require('express')
, routes = require('./routes/routes') 
, http = require('http') 
,path = require('path')   
,ejs = require('ejs')   
,bodyParser = require('body-parser')
,multer = require('multer')
,cookieParser = require('cookie-parser')
,session = require('express-session')
, SessionStore = require("session-mongoose")(express)
,mongoose = require('mongoose');



//var cookieParser = require('cookie-parser');    
global.dbHelper = require( './common/js/dbHelper');
                                                 
               
/**授权验证函数*/
global.requiredAuthentication =  function requiredAuthentication(res, sid, fn) {
   var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/session');     
   var Schema = mongoose.Schema;
   var Session = new Schema({
      sid: String,
      data: {
        cookie: {
          path: String,
          _expires: Date,
          originalMaxAge: Number,
          httpOnly: Boolean ,
          expires: Date,
          maxAge: Number,
          data: {
            originalMaxAge:Number,
            expires: Date,
            secure: String,
            httpOnly: Boolean ,
            domain: String,
            path: String
          }
        },
        user: {
          name: String,
          username: String,
          hash: String,
          email: String,
          login: String,
          sid: String
        }
      },
      expires: Date
    });

    var SessionModel = mongoose.model('sessions', Session); // BlogPost is an object here
   
   
   
   SessionModel.findOne({sid:sid}, 
       function (err, ses) {   
            if (err) res.json({err:err}); 
            if (!ses) res.redirect('http://www.cpowersoft.com/console/login.htm');
            else {
                mongoose.connection.close();
                return fn(null, ses);
            }
        });  
}

    
var app = express();

app.configure(function () {
   app.set('port', process.env.PORT || 8080);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(multer());                           
    app.engine('.html', ejs.__express);  //不使用ejs模板，直接使用html
    app.set('views', __dirname + '/1.0/views');    //模板路径
    app.set('view engine', 'html');     //不使用ejs模板，直接使用html            
    app.use(express.cookieParser('myb'));
    app.use(express.session({    
        store: new SessionStore({
            url: "mongodb://localhost/session",
            interval: 120000
        }), 
        cookie: { maxAge: 900000 },
        secret: 'myb'
    }));    
                                               
}); 
                 
//允许跨域请求，解决数据库8080端口，在客户端用80端口请求失败的问题
app.all('*', function(req, res, next) {                   
    res.header("Access-Control-Allow-Origin", "*");                        
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");      
    next();
});      
/*
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});
*/
routes(app);                                                          

 http.createServer(app).listen(app.get('port'), function () { 
    console.log("Express server listening on port " + app.get('port'));
});
                          


  