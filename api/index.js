const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();

const connectToMongoDb=require('./mongodb/conntectToDb.js')
connectToMongoDb();
app.use(express.json());

app.use("/api/auth",require("./routes/auth.js"));
app.use("/api/users",require("./routes/user.js"));
app.use("/api/property",require("./routes/listening.js"));

app.use("/api/wishlist",require("./routes/wishlist.js"));
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});