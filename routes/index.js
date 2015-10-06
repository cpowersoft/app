// Connect to MongoDB using Mongoose        
var mongoose = require('mongoose');          

/**
* 查询数据list
* 
* @param req 
* @param res
* @return string
* 
* @last update author : nic
* @last update date : 2015-08-23 20:00:00
**/     
exports.index = function (req, res) {
                 
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);     
                                    
    console.log(req.session.user);
    
         
    var database = global.dbHelper.getModel(req.params.table);
     var orderBy={},
        param = req.query.orderBy,
        arr = [];
    if(param){
        arr = param.split('__');
        if(arr[1] == 'asc'){
           arr[1] = 1;
        }else{
           arr[1] = -1; 
        }
        orderBy[arr[0]] = arr[1];
    }  

    //查询总记录
    var total;
    database.count(function (err,doc) {
        if (err) {
            return res.json({err:err});
        }                
        total = doc;
    })
     
   database.find(function (err,doc) {
        if (err) {
            return res.json({err:err});
        }
        //返回list和总条数                
        var rs = {
            list : doc ,
            total: total
        };     
         
        var string = JSON.stringify(rs);    //压缩对象转字符 更易传输   前端 JSON.parse(string): 字符转回对象            
        res.send(string);
        mongoose.connection.close();               
    })
    .limit(req.params.limit) //查找多少条
    .skip(req.params.skip).sort(orderBy); //跳过多少条
    
}          
    

/**
* post插入一条记录到数据库 
* @param req 
* @param res
* 
* @last update author : nic
* @last update date : 2015-08-23 20:00:00
*/
exports.create = function (req, res) {
                                          
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);                                           
    //var dbconn = mongoose.createConnection('127.0.0.1:27017', req.params.db);      
                                       
    var database = global.dbHelper.getModel(req.params.table);
     
    var createData = new database(req.body);
    
    createData.save(function (err,doc) {
        if (err){
            return res.json({err:err});
        }else{
            res.json();                   
        }
          mongoose.connection.close();  
    }); 

};


exports.account = function (req, res) {
                 
    var dbconn = mongoose.connect('mongodb://127.0.0.1:27017/'+req.params.db);       
    var database = global.dbHelper.getModel(req.params.table);

    //查询总记录
    var total;
    database.count(function (err,doc) {
        if (err) {
            return res.json({err:err});
        }                
        total = doc;
    })
     
   database.find(function (err,doc) {
        if (err) {
            return res.json({err:err});
        }
        //返回list和总条数                
        var rs = {
            list : doc ,
            total: total
        };     
         
        var string = JSON.stringify(rs);    //压缩对象转字符 更易传输   前端 JSON.parse(string): 字符转回对象            
        res.send(string);
        mongoose.connection.close();               
    });

    
}   