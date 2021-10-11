const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY='mycustomsignature'
const fetchUser=require('../middleware/fetchUser');

//create user for our app
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "ENter a valid name").isLength({ min: 3 }),
    body("password", "Password must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      let success=false;
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      console.log("fetched user", user);
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
          user:{
              id:user.id
          }
      }
      const authtoken=jwt.sign(data,SECRET_KEY);
      console.log("jwtdata",authtoken);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log("Error caught in catch block", error);
      res.status(500).send("INternal server error");
    }
  }
);



// authenticate a user or login functionality
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
    
  ],
  async (req, res) => {
    let success=false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }

      const {email,password}=req.body;
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
      }

      const passCompare=await bcrypt.compare(password,user.password)
      if(!passCompare){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }
    const payload={
        user:{
            id:user.id
        }
    }
    const SECRET_KEY='mycustomsignature'
    const authtoken=jwt.sign(payload,SECRET_KEY);
    console.log("jwtdata",authtoken);
    success=true;
    res.json({success,authtoken});
    } catch (error) {
      console.log("Error caught in catch block", error);
      res.status(500).send("INternal server error");
    }
  });


// Route 3:Get User details
  router.post(
    "/getUser",fetchUser,async (req, res) => {
      try {
        const userId=req.user.id;
        const userDetails=await User.findById(userId).select("-password");
        res.send(userDetails);
       
      
      } catch (error) {
        console.log("Error caught in catch block", error);
        res.status(500).send("INternal server error");
      }
    }); 

module.exports = router;
