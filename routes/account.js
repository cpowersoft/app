// Connect to MongoDB using Mongoose        
var mongoose = require('mongoose');          
   
 
/**
* 
*/
exports.add = function (req, res) {
                                          
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