// Connect to MongoDB using Mongoose        
var mongoose = require('mongoose');          
var fs = require('fs')
,path = require('path');  
 
/**
* 增加一个订单
*/
exports.add = function (req, res) {
                                          
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                                           
    //var dbconn = mongoose.createConnection('127.0.0.1:27017', req.params.db);      
                                       
    var database = global.dbHelper.getModel(req.params.table);
    

    var createOrder = new database(req.body);
      
    createOrder.save(function (err,doc) {
        if (err){
            return res.json({err:err});
           
        }else{
            res.send(200);                   
        } 
          mongoose.connection.close();  
    }); 

};

exports.addfile = function (req, res) {

    var bodys = req.body,
        jsonData = {};
    var timestamp = Date.now(),
    types = bodys.type.split('/')[1];

    var suffix = timestamp+'.'+types;
    var newPath = path.join(__dirname,'../../','images/templates/'+suffix);
        savePath = newPath.split('/var/www/html')[1];
        
   
    var imgData = bodys.template_base.replace('data:image\/'+types+';base64,',''); 

   fs.writeFile(newPath, imgData, 'base64', function(err){         
        if(err){
            return res.json({error:err});
        }
          jsonData = {template_name:bodys.template_name,template_path:bodys.template_path,template_img:savePath};
         
       var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                                            
                                           
        var database = global.dbHelper.getModel(req.params.table);
        

        var createOrder = new database(jsonData);
          
        createOrder.save(function (errs,doc) {
            if (errs){
                return res.json({error:errs});
               
            }else{
                res.send(200);                   
            } 
              mongoose.connection.close();  
        }); 
        
    })
  

};

exports.select = function (req, res) {
    
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                         
    var database = global.dbHelper.getModel(req.params.table);
        
        database.find({},function(err, docs){
            if (err) {
                return res.json({err:err});
            }                
            var rss = {
                list : docs  
            };              
            res.json(rss);
            mongoose.connection.close();       
        });

}    

exports.del = function (req, res) {
    
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                         
    var database = global.dbHelper.getModel(req.params.table);
        console.log(req.query.id);
        database.remove({_id:req.query.id},function(err, doc){
            if (err) {
                return res.json({err:err});
            }
            if(doc){
                res.send(200);
            }else{
                res.send(404);
            }                             
            mongoose.connection.close();       
        });

}    
    
exports.join = function (req, res) {
  var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                         
    var database = global.dbHelper.getModel(req.params.table);

        database.find()
            .populate('channel_logId','_id name')
            .exec(function(err, docs){
                   if (err) {
                    return res.json({err:err});
                }

                     var rss = {
                        list : docs  
                    };              
                    res.json(rss);

                mongoose.connection.close(); 
            });
    
  /*
        database.findOne({dd_name:'bbb'},function(err, doc){
            if (err) {
                return res.json({err:err});
            }                
            redata.create({
                dd_id: 55,
                di_value: doc._id,
                di_caption: '6666'
            }, function(err, re){
                if (err) {
                    return res.json({err:err});
                }  
                res.send(re);
                console.log(re);
                mongoose.connection.close(); 
            });
        });
 */    
}      
       
       
          
// 用啦做测试的          
exports.test = function (req, res) {
        
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db),                         
        dd = global.dbHelper.getModel(req.params.table),        //dd 数据模型对象
        shipping = global.dbHelper.getModel('shipping_mark');   //测试表数据模型对象
        
        var ssdd = new dd(req.body);
        ssdd.save(function(err, doc){
       // dd.findOne({dd_name:req.body.username},function(err, doc){      
            if (err) {
                return res.json({err:err});
            }
            console.log(doc);
            if(doc._id){
               // req.session.username = doc.dd_name;
                var _id = doc._id;
                //查询成功，把数据对测试表进行添加
                shipping.create({
                    express_id: 1,
                    value: _id,
                    name: doc.dd_name,
                    url: doc.dd_caption
                },  function(err, doc){
                    
                    if (doc) {
                        console.log('add success');
                        //添加成功，把数据从原表中删除
                        dd.remove({_id:_id}, function(err, doc){
                            console.log(doc.result.ok);
                            
                            if(doc){
                                res.send(200);
                                console.log("delete OK");
                                res.redirect('http://www.cpowersoft.com:80/console/form.html');
                            }else{
                                res.send(404);
                                console.log("404");
                            }
                             mongoose.connection.close();
                         });
                    }
                   
                });
            }else{
                res.send('name no match');
                console.log('name no match');
                mongoose.connection.close();
            }                
            
                 
        });

}                