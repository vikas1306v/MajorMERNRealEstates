const mongoose=require('mongoose');
const {Schema}=mongoose;
const SellerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    properties:[{
        type:Schema.Types.ObjectId,
        ref:'Property'
    }]
});


module.exports=mongoose.model('Seller',SellerSchema);