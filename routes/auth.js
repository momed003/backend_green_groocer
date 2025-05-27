const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');

// endpoint register
router.post('/register', async (req, res) => {
    const {name, email, password, phone, nuit} = req.body;

    if (!name || !email || !password || !phone || !nuit) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields",
            status: "400"
        });
    }

    try {
        //const existingUser = await User.findOne({ email: email }).exec();
          //  .maxTimeMS(30000) // 30 segundos de timeout
          //  .exec();
        /*if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                status: "400"
            });
        }*/


        const hashed = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashed,
            phone,
            nuit
        })
        await user.save().then().catch(err => console.log(err));

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userResponse,
            status: "201"
        });
    }catch(err){
        res.json({success: false,message:`User not created with error: ${err.message}`,status:"400"});
    }
});

//endpoint login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user=await user.findOne({email});
        if(!user){
            return res.status(400).json({success: false,message:"User not found",status:"400"});
        }

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false,message:"Invalid password",status:"400"});
        }
        const token=jwt.sign({id: user.phone}, process.env.JWT_SECRET, {expiresIn: 3600});
        res.json({success: true,token,status:"200"});
    }catch(err){
        res.status(400).json({success: false,message:`Login not successful with error: ${err.message}`,status:"400"});
    }
})
module.exports = router;
