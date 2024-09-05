const express=require("express");
const nodemailer=require('nodemailer');
const router = express.Router()
const UserModel=require("./mongo.js");
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.emailPORT || 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: `${process.env.USER_MAIL}`,
      pass: `${process.env.USER_PASS}`,
    },
  });



router.post("/connect_with_me",async(req,res)=>{ 
   try {
    const received =req.body;
    if(received.formDetails.email.length===0){
        console.log("Error of no email")
        throw({"message":"Enter your email first"});
    }

    const result=await UserModel.findOne({email:req.body.formDetails.email});
    console.log(result);
    if(result)
    {throw({"message":"User Already Exists.Please enter another email."});}

    const response = await UserModel.create(req.body.formDetails);
    console.log(response)
    if(response && response.email.length!=0){
        try{
            const info = await transporter.sendMail({
                from: '"Sarthak Kashmira 👻" <rockerz99883311@gmail.com>', // sender address
                to: response.email, // list of receivers
                subject: "Confirmation of connect.", // Subject line
                text: "Than you for connecting.Lets build a better community ahead.", // plain text body
                html: "<b>Than you for connecting.Lets build a better community ahead. It is a no-reply email</b>", // html body
              });
            
              console.log("Message sent: %s", info.messageId);
              res.json({"result":response,"message":"User registered successfully"});
        }
        catch(err){
            throw(err);
        }
    }
   } catch (error) {
    res.json(error);
   }
})
module.exports=router;

