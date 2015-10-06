/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */                                                       

var index = require('./index');
var user = require('./user');
var order = require('./order');
var account = require('./account');
//var product = require('./product');

var mongoose = require('mongoose');    

module.exports = function (app) {
    
    /**  public start */
    app.get('/list/:db/:table',  index.index);   //limit 多少条记录   skip 第几条开始
    
    app.get('/account/:db/:table',  index.account);   //limit 多少条记录   skip 第几条开始
    
    app.post('/create/:db/:table', index.create);/** * public end */ 
                                                  
            
    app.post('/load/:db/:table',order.add);
         
    app.get('/load/:db/:table',order.add);
                                           
    app.post('/addaddress/:db/:table', order.add);    
         
    
    app.get('/order/:db/:table',order.select);
    
    //用来测试数据    复制  粘贴  删除
    app.post('/test/:db/:table',order.test);
   
    app.get('/join/:db/:table',order.join);
    
    //物流渠道
    app.post('/logist/:db/:table',order.add);
    
    app.get('/logist_find/:db/:table',order.select);
    
    app.get('/logist_del/:db/:table',order.del);
    
    app.post('/logist_tem/:db/:table',order.addfile);
    
    /*app.get('/profile', requiredAuthentication, function (req, res) {
        res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/logout">logout</a>');
    });
    */
    app.post("/login", user.login);         //登陆
    
    app.post('/register', user.register);   //qq注册    
    
    app.post('/aliexpressreg', user.aliexpressreg);    //ali注册
     
    app.post('/usercheck', user.usercheck);     //核实邮箱
    
    app.post('/ordinaryreg', user.ordinaryreg);     //普通注册
    
    
    app.get("/", function (req, res) {
        //res.send('Profile page of '+ req.session.user.email +'<br>'+' click to <a href="/logout">logout</a>');
    }); 
};