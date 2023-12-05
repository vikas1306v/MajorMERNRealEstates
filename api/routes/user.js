const router=require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET=process.env.JWT_SECRET;
const fetchuser=require('../middleware/fetchuser');
var nodemailer = require('nodemailer');


// delete a User using: DELETE "/api/user/:id". Login required
router.delete('/delete/:id',fetchuser ,async (req, res) => {
    try {

        const id=req.id;
        if(id!=req.params.id){
            return res.json({
                success:false,
                error:"You are not authorized to delete this user"
            })
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.json({
                success: false,
                error: 'User not found'
            })
        }
        return res.json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
})

//forgot password resend link

router.post('/forgotpassword',async (req,res)=>{

    const {email}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            error:"User doesn't exist"
        })
    }
    const token = jwt.sign({ user_id: user.id, user_role: user.role }, JWT_SECRET, {
        expiresIn: "24h",
      });

    
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vikas1306v@gmail.com',
      pass: 'djkv xrhs yzmr ikhm    '
    }
  });
  
  var mailOptions = {
    from: 'vikas1306v@gmail.com',
    to: `${email}`,
    subject: 'Forgot Password Real State',
    text: `http://localhost:5173/resetpassword/${user.id}/${token}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    //   console.log(error);
    } else {
    //   console.log('Email sent: ' + info.response);
    }
  });
})

router.post('/resetpassword/:id/:token',async (req,res)=>{

    const {id,token}=req.params;
    const {password}=req.body;

    const user=await User.findById(id);
    if(!user){
        return res.json({
            success:false,
            error:"User doesn't exist"
        })
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        const salt = bcrypt.genSaltSync(10);
        const encPass = await bcrypt.hash(password, salt);
        user.password=encPass;
        await user.save();
        return res.json({
            success:true,
            message:"Password changed successfully"
        })
    }
    catch(error){
        return res.json({
            success:false,
            error:"Invalid token"
        })
    }
})

module.exports = router;