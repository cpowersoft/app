// Connect to MongoDB using Mongoose  

var mongoose = require('mongoose');    

var crypto = require('crypto');

/*module.exports = function (app) {
    
   
    app.post("/signup", userExist, function (req, res) {
    
        var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myapp');     
        
        var database = global.dbMyb.getModel('users');
       
        var password = req.body.password;
        
        var username = req.body.username;

        console.log(req.body);
        
        hash(password, function (err, salt, hash){
            if (err) throw err;
            database.save(function (err) {
                if (err) throw err;
                authenticate(username, password, function(err){
                    
                    if(user){
                        req.session.regenerate(function(){
                            req.session.user = username;
                            req.session.success = 'Authenticated as ' + username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                            
                        });
                    }
                });
            });
        });
    });
    
    app.get('/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/');
        });
    });

}*/

exports.login = function (req, res) {
   
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myb');     
    
    var database = global.dbHelper.getModel('user');
   
  // req.session.user = {email:"MYTest@163123123123.com"};
   //res.send('email of '+ req.session.user.email);
   
   database.findOne({username:req.body.username}, function (err, user) {   
        if (err) res.json({err:err});     
        if (!user) {         
            res.json({err:'用户名不存在'}); 
           
        }else{
            var md5 = crypto.createHash('md5');  
            if(md5.update(req.body.password).digest('hex') == user.password){   
                var result_user = {
                    sid:req.session.id,
                    uid:user._id,
                    name:user.name == '' ? user.username : user.name,
                    username:user.username,
                    hash: user.password,
                    email:user.email  ,
                    login:user.login_type == '' ? "ice" : user.login_type
                }                                      
               
                req.session.user = result_user;
                result_user.sid = req.session.id;
                
                //res.send('email of '+ req.session.user.email); 
                var string = JSON.stringify(result_user);    //压缩对象转字符 更易传输   前端 JSON.parse(string): 字符转回对象
                res.send(string);
            }else{                        
                res.json({err:'用户名或密码错误'});          
            }         
        }
        mongoose.connection.close();              
    });
    
}

//检测邮箱|用户名是否存在
exports.usercheck = function(req, res){
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myb'),                         
        userdata = global.dbHelper.getModel('user');
    var bodys = req.body,
        where = {};
        for(var index in bodys){
            where[index] = bodys[index];
        }

        userdata.findOne(where, function(err, doc){
            if (err) {
                return res.json({err:err});
            }
            if(doc){
                res.send(false);
                mongoose.connection.close();
            }else{
                res.send(true);
                mongoose.connection.close();
            }
        });  
   
}
      
//普通注册页面
exports.ordinaryreg = function(req, res){
    
        var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myb'),                         
        userdata = global.dbHelper.getModel('user');       
        
        var bodys = req.body,
        md5 = crypto.createHash('md5'),  
        str = md5.update(bodys.password).digest('hex'),
            userdatas = {
                username:  bodys.username,
                email: bodys.email,
                password: str
            };
        
        var ssdd = new userdata(userdatas);
        ssdd.save(function(err, doc){      
            if (err) {
                return res.json({err:err});
            }
            if(doc._id){
                res.send(200);
                console.log('OK');
                mongoose.connection.close();
            }else{
                res.send(404);
                mongoose.connection.close();
            }
        });
}      
                                 
//QQ注册
exports.register = function(req, res){

        var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myb'),                         
        userdata = global.dbHelper.getModel('user'),        
        userinfo = global.dbHelper.getModel('user_info'),
        qqinfo =  global.dbHelper.getModel('qq_account');
        
        var bodys = req.body,
        md5 = crypto.createHash('md5'),  
        str = md5.update(bodys.password).digest('hex'),
            userdatas = {
                email: bodys.email,
                password: str
            };
        
        var ssdd = new userdata(userdatas);
        ssdd.save(function(err, doc){      
            if (err) {
                return res.json({err:err});
            }
            if(doc._id){
   
                var _id = doc._id;
                userinfo.create({
                    user_ObjectId: _id,
                    province: bodys.province,
                    user_photo: bodys.figureurl,
                    infotype: bodys.type
                },  function(err, doc){
                    if (doc) {
                        
                        qqinfo.create({
                            openId: bodys.openId,
                            user_ObjectId: _id,
                            name: bodys.name,
                            accessToken: bodys.accessToken
                        }, function(err, doc){
                            if(doc){
                                   res.send(200);
                                   console.log('OK');
                               //  res.redirect('http://www.cpowersoft.com:80/console/form.html');
                                 mongoose.connection.close();
                            }else{
                                res.send('add 3error');
                                 mongoose.connection.close();
                            }
                        });
                    }else{
                        res.send('add 2error');
                        mongoose.connection.close();
                    }
                });
            }else{
                res.send('add error');
                mongoose.connection.close();
            }                 
        });

}

//ali注册
exports.aliexpressreg = function(req, res){
    
        var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/myb'),                         
        userdata = global.dbHelper.getModel('user'),        
        userinfo = global.dbHelper.getModel('user_info'),
        aliinfo =  global.dbHelper.getModel('ali_account');
        
        var bodys = req.body,
        md5 = crypto.createHash('md5'),  
        str = md5.update(bodys.password).digest('hex'),
            userdatas = {
                name: bodys.truename,
                email: bodys.email,
                password: str
            };
        
        var ssdd = new userdata(userdatas);
        ssdd.save(function(err, doc){      
            if (err) {
                return res.json({err:err});
            }
            if(doc._id){
   
                var _id = doc._id;
                userinfo.create({
                    user_ObjectId: _id,
                    infotype: bodys.type,
                    tel: bodys.tel
                },  function(err, doc){
                    if (doc) {

                        aliinfo.create({
                            refresh_token_timeout: bodys.refresh_token_timeout,
                            user_ObjectId: _id,
                            aliId: bodys.aliId,
                            resource_owner: bodys.runame,
                            expires_in: bodys.expires_in,
                            refresh_token: bodys.re_token,
                            access_token: bodys.ac_token
                        }, function(err, doc){
                            if(doc){
                                   res.send(200);
                                   console.log('OK');
                               //  res.redirect('http://www.cpowersoft.com:80/console/form.html');
                                 mongoose.connection.close();
                            }else{
                                res.send('add 3error');
                                mongoose.connection.close();
                            }
                        });
                    }else{
                        res.send('add 2error');
                        mongoose.connection.close();
                    }
                });
            }else{
                res.send('add error');
                mongoose.connection.close();
            }                 
        });
    
}