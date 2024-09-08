//imports in the backend
const mongoose = require("mongoose");
const express = require("express");
const Mainrouter = require("./app.js");
const cors = require("cors");
require('dotenv').config();
const PORT=5000;
//middlwewares used
const app = express();
app.use(cors());
app.use(express.json());
//routes directed 
app.get("/",(req,res)=>{
  res.status(200).send("Hello Portfolio");
});
app.use("/", Mainrouter);
app.use(express.urlencoded({extended:true}))


//connected to database
const url=process.env.MONGODB_URL;
const connectDB=async()=>{
    await mongoose.connect(`${url}`)
    .then(()=>{console.log("connected");})
    .catch((error)=>{console.log(error); console.log('failed');})
}
connectDB();
//listening on app
app.listen(PORT,()=>{console.log(`Running on server ${PORT}`)});
