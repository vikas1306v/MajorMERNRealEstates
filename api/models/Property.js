const mongoose=require('mongoose')
const {Schema}=mongoose
const Property=new Schema({

    description:{
        type:String,
        required:true
    },

    images:[{
        type:String,
        default:'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'
    }],
    lower_price:{
        type:String,
        required:true
    },
    upper_price:{
        type:String,
        required:true
    },
    society:{
        type:String,
        required:true
    },
    full_address:{
        type:String,
        required:true
    },
    bhk_type:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    facing:{
        type:String,
        required:true

    }
    ,user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    

},{
    timestamps:true
});


module.exports=mongoose.model("Property",Property)