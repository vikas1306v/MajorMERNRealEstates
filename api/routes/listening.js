// Desc: Router for listening to the server

const Property=require('../models/Property');
const router = require('./auth');


const fetchuser=require('../middleware/fetchuser');
router.post("/addproperty",fetchuser,async (req,res)=>{
  const id=req.id;
    const{description,
        images,lower_price,upper_price,society,full_address,bhk_type,bathrooms,facing}=req.body;
        try{
          const property=  await  Property.create({
            description: description,
            images: images,
            lower_price: lower_price,
            upper_price: upper_price,
            society: society,
            full_address: full_address,
            bhk_type: bhk_type,
            bathrooms: bathrooms,
            facing: facing,
            user_id:id

          })
            res.json({
                success:true,
                property:property
            })
         
        }
        catch(error)
        {
           
            res.status(500).send("Internal Server Error");
        }

})


//show all properties
router.get("/showall",fetchuser,async (req,res)=>{
 
  try{
    const properties=await Property.find({});
   return  res.json(properties);
  }
  catch(error)
  {
    
    res.status(500).send("Internal Server Error");
  }
})

//filters for properties
// route for filter by bhk type
router.post("/filterbybhk",fetchuser,async (req,res)=>{
  const {bhk_type}=req.body;
  try{
    const properties=await Property.find({bhk_type:bhk_type});
  
    return res.json({
      success:true,
      properties:properties
    });

  }
  catch(error)
  {
   
    res.status(500).send("Internal Server Error");
  }
})

//router for filter by bathrooms
router.post("/filterbybathrooms",fetchuser,async (req,res)=>{
  const {bathrooms}=req.body;
  try{
    const properties=await Property.find({bathrooms:bathrooms});
    return res.json({
      success:true,
      properties:properties
    });
  }
  catch(error)
  {

    res.status(500).send("Internal Server Error");
  }
})

router.post("/filterbyfacing",fetchuser,async (req,res)=>{
  const {facing}=req.body;
  try{
    const properties=await Property.find({facing:facing});
   
    return res.json({
      success:true,
      properties:properties
    });
    
  }
  catch(error)
  {

    res.status(500).send("Internal Server Error");
  }
})



module.exports=router;