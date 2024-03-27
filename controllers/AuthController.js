const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {expressjwt} = require("express-jwt")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config();



require("cookie-parser")


exports.isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
})



exports.signup = async(req,res)=>{
    try{
        const{ email, password } = req.body
        
        if(!(email && password)){
            res.status(400).send("Please enter all fields")
        }
        const existentUser = await User.findOne({email})
        if(existentUser){
            return res.status(409).send("User already exists, please sign in instead")
        }
        encryptPass = await bcrypt.hash(password, 10);

        
        
        const user = await User.create({email, password:encryptPass})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error})
    
    }
    
} 

exports.signin = async(req, res)=>{
    try{
        const{ email, password } = req.body
        const user = await User.findOne({ email })
        if (!user){
            return res.json({status: 'error', error: 'Invalid username or password'})
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if(comparePass){
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,{
                    expiresIn: 86400    //24 hours
                }
            )
            return res.json({ user, token: token })
            function verifyAccessToken(token) {
                const secret = 'your-secret-key';
              
                try {
                  const decoded = jwt.verify(token, secret);
                  return { success: true, data: decoded };
                } catch (error) {
                  return { success: false, error: error.message };
                }
              }
            
        }else{
            return res.json({ status: 'error', error: 'Check the password!!'})
        } 






    }catch(error){console.log(error)}

}