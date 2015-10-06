var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
                    
module.exports = {     
    /*
    * myb 用户公共表 
    */         
    user:{
        name: {type: String},   
        username:{type: String},
        password: {type: String, required: true},      
        email: {type: String},  
        login_type:{type: String,required: true,default:"email"},   //登陆方式
    },
    user_info:{
        add_time:{type: Date, default:Date.now},    //注册时间
        user_photo:{type:String},   //照片 
        phone:{type:String},        //手机号码
        company:{type:String},      //公司名
        province:{type:String},     //省份
        city:{type:String},         //城市
        street:{type:String},       //街道地址
        infotype:{type: String} ,          //用户类型
        tel:{type :String},
        user_ObjectId:{type: Schema.ObjectId, ref:'user'}  //user表 objectid
    },
    qq_account:{                             
        openId:{type: String},        //qq openid
        name:{type: String},          //qq名
        user_ObjectId:{type: Schema.ObjectId, ref:'user'},  //user表 objectid
        accessToken:{type: String}    //qq accessToken
    },
    ali_account:{
        refresh_token_timeout:{type: String}, //长令牌过期时间
        aliId:{type: Number},                 //aliexpress唯一用户id
        resource_owner:{type: String},        //用户名
        expires_in:{type: Number},            //短令牌过期剩余时间
        refresh_token:{type: String},         //长令牌
        access_token:{type: String},          //短令牌
        user_ObjectId:{type: Schema.ObjectId, ref:'user'}          //user表 objectid
    },

    
    
    
    
    
    
    
    
    
              
    
    
   //订单首页
   order_index:{
       account_num:{type:Number},               //账号数量
       today_sale:{type:Number},                //今天销售额
       total_sales:{type:Number},               //总销售额
       all_orders:{type:Number},                //所有订单
       wait_shipments:{type:Number},            //等待发货
       already_shipments:{type:Number},         //已经发货
       today_add:{type:Number},                 // 今日新增
       last_sync_time:{type:Number},            //上次同步时间
       unanswered_messages:{type:Number},       //未回复留言
       used_logistics_mode:{type:String},       //已使用物流方式
       express_rule:{type:String},              //快递规则
       untreated_purchases_note:{type:Number},  //未处理采购单
       all_purchases_note:{type:Number},        //所有采购单
       total_purchases:{type:Number},           //采购总金额
       untreated_godown_entry:{type:Number},    //未处理入库单
       all_godown_entry:{type:Number}          //所有入库单
   },
   
    
    aliexpress_account:{
         userId : String,   
         name : String,   
         appkey : String,   
         appSecret : String,   
         aliId : String,   
         resource_owner : String,   
         access_token : String,   
         refresh_token : String,   
         create_time : Date,   
         passtime : Date,   
         longpasstime : Date  
    },
   
    aliexpress_order_combined:{   
        root_id:{type: String },    
        order_id:{type: String }
    }, 
    
    
    aliexpress_order_log:{   
        order_id:{type:Schema.ObjectId},    
        action:{type: String} ,
        content:{type: String} ,
        user_id:{type:Schema.ObjectId} ,
        addtime:{type:Date, default:Date.now}
    },       
   
   /*****
   * aliexpress待审核订单   
   * 
   * 订单的简单列表 
   * 
   * 字段与速卖通api接口findOrderListSimpleQuery相对应
   * 
   * api接口返回值
   * 
   * {"totalItem":6,"orderList":[{"gmtModified":"2014-04-03 22:14:21","gmtCreate":"2014-04-03 22:14:21","memo":"","
   * productList":[
   * {"goodsPrepareTime":30,
   *  "childId":30025745255804,
   * "sonOrderStatus":"PLACE_ORDER_SUCCESS",
   * "productSnapUrl":"http://www.aliexpress.com/snapshot/3000857421.html",
   * "moneyBack3x":false,
   * "productUnit":"piece",
   * "skuCode":"123456789",
   * "productId":1096151852,
   * "productCount":1,
   * "productUnitPrice":"300.0",
   * "productImgUrl":"http://img.alibaba.com/kf/HT1tAAGFsFaXXagOFbXv.jpg",
   * "productName":"test",
   * "productUnitPriceCur":"USD"}
   * ],
   * "bizType":"AE_COMMON",
   * "orderStatus":"PLACE_ORDER_SUCCESS",
   * "orderId":30025745255804}
   * ]}
   * 
   * 
   */        
     
   aliexpress_auditing_order:{                  //审核订单
        orderId:String,                         //速卖通交易id
        gmtModified:Date,                       //订单最后修改时间
        gmtCreate:Date,                         //订单创建时间
        memo:String,                            //订单的付款留言
        productList:[
            {
                goodsPrepareTime :  Number,     //备货时间
                childId :           String,     //子订单号
                sonOrderStatus :    String,     //子订单状态
                productSnapUrl :    String,     //快照URL
                moneyBack3x :       Boolean,    //是否支持假一赔三
                productUnit :       String,     //商品单位
                skuCode :           String,     //商品编码
                productId :         String,     //商品ID
                productCount :      Number,     //商品数量
                productUnitPrice :  Number,     //商品单价
                productImgUrl :     String,     //商品主图URL
                productName :       String,     //商品名称
                productUnitPriceCur:Number      //商品货币名称
            }
        ],    
        bizType:Number,                         //订单类型
        orderStatus:String,                     //速卖通订单状态          
        status:String,                          //状态
        country:String,                         //订单国家
        account: {type: Schema.ObjectId, ref:'aliexpress_account'} //账号         
    }, 
    
     aliexpress_order_address:{         //订单地址信息
        order_id:{type:String},    
        consignee:{type: String},    
        email:{type: String},    
        street1:{type: String},    
        street2:{type: String},    
        city:{type: String}, 
        state:{type: String},    
        country:{type: String},    
        CountryCode:{type: String},          
        zipcode:{type: String},    
        tel:{type: String},    
        sellerID:{type: String}
    },
     
     aliexpress_order_goods:{         //订单商品信息
        order_id:{type:String},    
        goods_sn:{type: String},    
        item_no:{type: String},
        goods_name:{type: String},
        goods_price:{type: String},
        goods_qty:{type: Number},    
        attribute_note: {type: String},
        order_object_id:{type: Schema.ObjectId, ref:'aliexpress_order_address'}
    }, 
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
                             
    dd:{                  
        dd_name:{ type: String},
        dd_caption:{ type: String},        
    },   
    dd_item:{
        dd_id:{type:Number},    
        di_value:{type: Schema.ObjectId, ref:'dd'},
        di_caption:{type: String}
    },        
    depot:{
        name:{type: String},
        depot_id:{type:Schema.ObjectId},
        is_main:{type: Boolean}
    },   
    depot_stock:{
        goods_id:{type:Schema.ObjectId},    
        shelf_id:{type:Schema.ObjectId},    
        goods_qty:{type:Number},    
        varstock:{type:Number},    
        warn_qty:{type:Number},    
        stock_place:{type: String}        
    },  
    express_rule:{
        rule_id:{type:Number},    
        value:{type: String},    
        express_id:{type:Number},    
        order_by:{type:Number},    
        is_action:{type: Boolean}
    },  
    express_rule_option:{
        express_rule_id:{type:Schema.ObjectId}, 
        rule_id:{type:Number},     
        value:{type: String},
        if_rule:{type: String}
    },   
    goods:{
        SKU:{type: String},
        goods_name:{type: String},
        add_time:{type:Date, default:Date.now},
        dec_name:{type: String},
        dec_name_cn:{type: String},
        Declared_value:{type:Number},
        Declared_weight:{type:Number},             
        goods_img:{type: String},             
        l:{type:Number},             
        w:{type:Number},             
        h:{type:Number},             
        grossweight:{type:Number},             
        weight:{type:Number},             
        cost:{type:Number},             
        price:{type:Number},             
        keyword:{type: String}  
    },
    
    goods_log:{
        goods_id:{type:Schema.ObjectId},    
        action:{type: String},    
        field:{type: String},    
        content:{type: String},    
        addtime:{type:Date, default:Date.now}
    },
    
    system_log:{
        user_id:{type:Schema.ObjectId },    
        log_time:{type:Date, default:Date.now},    
        module_name:{type: String},    
        log_object:{type: String},    
        log_ip:{type: String},    
        content:{type: String}         
    },
    
    
    order_status:{
        status:{type:Number  },    
        next_id:{type:Schema.ObjectId},    
        hold_id:{type:Schema.ObjectId},    
        refund_id:{type:Schema.ObjectId},    
        fail_id:{type:Schema.ObjectId},    
        pay_status:{type: Boolean},    
        shipping_status:{type:Number  },    
        start_end:{type:Number  },    
        is_show:{type: Boolean},    
        description:{type: String}   
    },
    p_order:{
        p_order_sn:{type: String},    
        supplier_id:{type:Schema.ObjectId},   //榛樿?? type:Schema.ObjectId
        add_time:{type:Date, default:Date.now},    
        status:{type:Number},   
        is_pay:{type: Boolean},   
        comment:{type: String},  
        shipping_fee:{type:Number}, 
        operator_id:{type:Number},  
        arrive_time:{type:Date, default:Date.now},  
        pre_time:{type:Date, default:Date.now}
    },
    p_order_goods:{
        order_id:{type: String},    
        goods_id:{type:Number},         //?
        goods_price:{type:Number},    
        goods_qty:{type:Number},    
        arrival_qty:{type:Number},    
        return_qty:{type:Number},    
        remark:{type: String}       
    },
    shipping_depot:{
        shipping_id:{type:Number},    
        depot_id:{type:Number},      
    },
    shipping_cost:{    
        express_id:{type:Number},    
        value:{type: String},        
    },
    shipping_mark:{         
        express_id:{type:Number},            //?
        value:{type: String},    
        name:{type: String},    
        url:{type: String}
    },
    shipping_ntmark:{
        express_id:{type:Number}        //?
    },
    shipping_unmark:{   
        express_id:{type:Number}       //?
    },
    supplier:{
        name:{type: String},    
        sn:{type: String},    
        contact:{type: String},    
        address:{type: String},    
        tel:{type: String},    
        zip:{type: String},    
        Email:{type: String},    
        skype:{type: String},    
        qq:{type: String},    
        comment:{type: String},    
        add_time:{type:Date, default:Date.now},    
        period:{type:Number},    
        user_id:{type:Number}
    },
    supplier_goods:{
        goods_id:{type:Schema.ObjectId},    
        supplier_goods_sn:{type: String},    
        supplier_goods_name:{type: String},    
        supplier_goods_price:{type:Number},    
        supplier_goods_remark:{type: String},    
        supplier_id:{type:Number},           //?
        url:{type: String}
    },
    stockin:{
        order_sn:{type: String},    
        add_time:{type:Date, default:Date.now},    
        out_time:{type:Date, default:Date.now},    
        operator_id:{type:Number},    
        stockin_type:{type:Number},    
        depot_id:{type:Number},        //?
        status:{type:Number},    
        comment:{type: String},    
        supplier:{type: String}
    },
    stockin_detail:{
        tin_order_id:{type:Schema.ObjectId},    
        goods_id:{type:Schema.ObjectId},    
        goods_qty:{type:Number},    
        goods_price:{type:Number},    
        remark:{type: String},    
        relate_order_sn:{type: String},    
        is_ok:{type: Boolean}
    },
    stockout:{
        order_sn:{type: String},    
        add_time:{type:Date, default:Date.now},    
        out_time:{type:Date, default:Date.now},    
        operator_id:{type:Number},    
        stockout_type:{type:Number},    
        depot_id:{type:Schema.ObjectId},    
        status:{type:Number},    
        comment:{type: String},    
        supplier:{type: String}       
        
    },
    stockout_detail:{     
        out_order_id:{type:Schema.ObjectId},    
        goods_id:{type:Schema.ObjectId},    
        goods_qty:{type:Number},    
        goods_price:{type:Number},    
        remark:{type: String},    
        relate_order_sn:{type: String},    
        is_ok:{type: Boolean}  
    },    
    
    
    
   
   
   
   
   
  
};   
//Number