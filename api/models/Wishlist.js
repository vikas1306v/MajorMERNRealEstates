const mongoose=require('mongoose')
const {Schema} =mongoose
const Wishlist=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ,
    property_ids:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Property'
        }
    ]

},
{timestamps:true}
)

module.exports=mongoose.model("Wishlist",Wishlist)