const Wishlist = require('../models/Wishlist');
const router=require('express').Router();
const fetchuser=require('../middleware/fetchuser');

const Property=require('../models/Property');


//add property to wishlist
router.post("/addpropertytowishlist",fetchuser,async (req,res)=>{
    const{user_id,propertyId}=req.body;
    if(req.id!=user_id){
        return res.json({
            success:false,
            message:"You are not authorized to add property to this wishlist"
        })
    }
    try{
        let wishlist=await Wishlist.findOne({user_id:user_id})
        if(!wishlist){
            wishlist=await Wishlist.create({
                user_id:user_id,
                property_ids:propertyId
            })
            return res.json({
                success:true,
                wishlist:wishlist
            })
        }
        for(let i=0;i<wishlist.property_ids.length;i++){
            if(wishlist.property_ids[i]==propertyId){
                return res.json({
                    success:false,
                    message:"Property already in wishlist"
                })
            }
        }
        if(wishlist){
            wishlist.property_ids.push(propertyId);
            wishlist=await wishlist.save();
            return res.json({
                success:true,
                wishlist:wishlist
            })

        }       
       
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
//remove from wishlist
router.post("/removefromwishlist",fetchuser,async (req,res)=>{
    const{user_id,propertyId}=req.body;
    
    try{
        let boolean=false;

        let wishlist=await Wishlist.findOne({user_id:user_id})
        if(!wishlist){
            return res.json({
                success:false,
                message:"There is no wishlist for this user you can remove property to wishlist"
            })
        }
        for(let i=0;i<wishlist.property_ids.length;i++){
           if(wishlist.property_ids[i]==propertyId){
            boolean=true;
              
           }
        }
        if(boolean && wishlist){
            wishlist.property_ids.pull(propertyId);
            wishlist=await wishlist.save();
            return res.json({
                success:true,
                wishlist:wishlist
            })

        }
        else{
            return res.json({
                success:false,
                message:"Property not in wishlist"
            })
        }
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//show all properties in wishlist of a user
router.get("/showall",fetchuser,async (req,res)=>{
    const id=req.id;
   
    try{
        const wishlist=await Wishlist.findOne({user_id:id});
        if(!wishlist){
            return res.json({
                success:false,
                message:"There is no wishlist for this user"
            })
        }
        if(wishlist.property_ids.length==0){
            return res.json({
                success:false,
                message:"There are no properties in wishlist"
            })
        }
        let properties=[];
        for(let i=0;i<wishlist.property_ids.length;i++){
            const property=await Property.findOne({_id:wishlist.property_ids[i]});
            properties.push(property);
        }
       
        return res.json({
            success:true,
            wishlist:properties
        })
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;