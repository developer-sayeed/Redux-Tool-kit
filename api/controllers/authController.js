const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc User Login System 
 * @route POST /users
 * @access PUBLIC
 */


const userLogin = asyncHandler(async( req, res)=>{

    const { email, password, } = req.body

    // Validate 

    if (!email  && !password) {
        return res.status(400).json({message : "All Fileds Are Requare"}) 
    }

    //  Check User

    const loginUser = await User.findOne({email})
    if(!loginUser){
        return res.status(400).json({
            message : "User Not Found"
        })
    }


    

    // Password Match 

    const passCheck = await bcrypt.compare(password, loginUser.password);
    if (!passCheck) {
        return res.status(400).json({
            message : "Wrong Password"
        })
    }

//  Access Token

const accessToken = jwt.sign({
    email : loginUser.email,
    role : loginUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN
    }
    )
    // Refrsh Token 

    const refreshToken = jwt.sign({
        email : loginUser.email,
        role : loginUser.role,
        },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN
        }
        )


// Send RefrshToken Cookie Memory 

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false, 
        maxAge : 1000 * 60 *60 *24 * 30
    });

    return res.status(200).json({
        token :accessToken,
        user : loginUser
    })

})


/**
 * @desc User Profile System 
 * @route GET /users
 * @access PUBLIC
 */

const me = (req,res) =>{

    if(!req.me){
        return res.status(400).json({
                message : "User Not Logged In"
            })
    } else{
        return res.status(200).json({
                    user : req.me
                })
    }

};




/**
 * @desc User Register System 
 * @route POST /users
 * @access PUBLIC
 */

const userRegister = asyncHandler(async(req, res)=>{
    // get json data
    const { email, password, username} = req.body

    // data validation
    if (!email ||!password ||!username) {
        return res.status(400).json({
                    message : "All Fileds Are Requare"
                })
        
    }
    // email exists check
    const emailExist = await User.findOne({email})

    // email validation Check
    if (emailExist) {
            return res.status(400).json({
                message : "Email Already Exist"
            })
        }
    // user exists check
    const usernameExist = await User.findOne({username})

    // username validation 

    if (usernameExist) {
                return res.status(400).json({
                    message : "Username Already Exist"
                })
            }
        
    // Create new user 
    
    // hash password

    const hash = await bcrypt.hash(password, 10);

    // create new user data

    const user = await User.create({
        email,
        password : hash,
        username,
    })
    // check user

    if(user){
        return res.status(201).json({
            message : "User Created successfully",
            user
        })
    } else{
        return res.status(400).json({
            message : "User Not Created"
        })
    }

})

/**
 * @desc Refresh Token 
 * @route GET /Refresh
 * @access PUBLIC
 */

const refreshToken = (req,res) =>{

  const cookies = req.cookies

    if (!cookies?.refreshToken) {
        return res.status(400).json({
            message : "Invalid Token request"
        })
    }

    const token = cookies.refreshToken

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async(error, decode)=>
     {
        if(error)  return res.status(400).json({
            message : "Invalid Token , Token Not Valid"
      })

        const tokenUser = await User.findOne({email : decode.email})
        if(!tokenUser)  return res.status(400).json({
            message : "Token User Not Found"
        })


        //  Access Token

    const accessToken = jwt.sign({
    email : tokenUser.email,
    role : tokenUser.role,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    );

    res.status(200).json({
        token : accessToken
    })

    })
    );

};



/**
 * @desc User Logout
 * @route POST /Logout
 * @access PUBLIC
 */

const userLogout = (req, res)=>{

    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        res.status(400).json({
            message : "Invalid Request"
        })
    }

res.clearCookie("accessToken", {
    httpOnly : true,
    secure : false
}).json({
    message : "User Logout Success"
});

}

// export 

module.exports = {userLogin, refreshToken, userLogout ,me, userRegister}