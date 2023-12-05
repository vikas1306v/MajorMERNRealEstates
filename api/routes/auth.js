const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user using: POST "/api/auth/". Doesn't require Auth

router.post("/signup", async (req, res) => {
  const { name, email, password, avatar } = req.body;
  let {role} = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.json({
      success: "false",
      error: "user already exist"
    });
  }

  if (role == "" || role == undefined) {
    role = "user_role";
  }
  const salt = bcrypt.genSaltSync(10);
  const encPass = await bcrypt.hash(password, salt);
  user = await User.create({
    name: name,
    email: email,
    password: encPass,
    avatar: avatar,
    role:role
  });

  const Token = jwt.sign({ user_id: user.id, user_role: role }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.json({
    success: true,
    user: user,
    access_token: Token,
  });
});


router.post("/login",async (req,res)=>{
  
    const {email,password}=req.body;
   let user=await User.findOne({email:email})
   if(!user){
       return res.json({
           success:false,
           error:"User doesn't exist"
       })
   }
   const new_password=await bcrypt.compare(password,user.password)
   if(!new_password){
        return res.json({
            success:false,
            error:"Invalid Credentials"
        })
   }
       const Token = jwt.sign({ user_id: user.id, user_role: user.role }, JWT_SECRET, {
        expiresIn: "24h",
      });
      return res.json({
          success:true,
          user:user,
          access_token:Token
      })
   })

   router.post("/google",async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        const token = jwt.sign({ user_id: user.id, user_role: user.role}, JWT_SECRET);
        return res.json({ success: true, user: user, access_token: token });
    
      } else {
        const salt = bcrypt.genSaltSync(10);
        const role="user_role";
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword =  await bcrypt.hash(generatedPassword,salt);
        const newUser = new User({ name: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo,role:role });
        await newUser.save();
        const token = jwt.sign({ user_id: newUser.id ,user_role:role}, JWT_SECRET,{
          expiresIn: "24h",
        });
       
        return res.json({ success: true, user: newUser, access_token: token });
        
      }
    } catch (error) {
     return res.json({ success: false, error: error.message });
    }
  }
   )
module.exports = router;
