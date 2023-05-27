const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");


const tokenVerify = (req,res, next) =>{

const authHeader = req.headers.authorization || req.headers.Authorization

if (!authHeader) {
    return res.status(400).json({
        message : " Unauthorizaed"
    })}

const token = authHeader.split(" ")[1]
    
    //  Jwt verify 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, asyncHandler(async(error, decode)=>{
        if (error) {
            return res.status(400).json({
                message : " Invalid Token"
            })
        }

    const me =await User.findOne({email : decode.email})
    
    req.me= me

    next()

    }))

};

// Export
module.exports = tokenVerify