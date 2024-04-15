const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {expressjwt} = require("express-jwt")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const sendEmail = require("../utils/sendEmail")
dotenv.config();
const express = require("express")

ACCESS_TOKEN_SECRET= "hello"
REFRESH_TOKEN_SECRET= "helloAgain"


const app = express()

require("dotenv").config()

require("cookie-parser")
app.use(express.json())




exports.signup = async(req,res)=>{
    try{
        const{ name, email, password } = req.body
        
        
        if(!(email && password)){
            res.status(400).send("Please enter all fields")
        }
        const existentUser = await User.findOne({email})
        if(existentUser){
            return res.status(409).send("User already exists, please sign in instead")
        }
        encryptPass = await bcrypt.hash(password, 10);

        
        
        const user = await User.create({name, email, password:encryptPass})
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
            const accessToken = jwt.sign({ userId: user.id, username: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '2m' });

  
            const refreshToken = jwt.sign({ userId: user.id, username: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            res.json({ accessToken, refreshToken });
            
            
              
              
            

              
            
        }else{
            return res.json({ status: 'error', error: 'Check the password!!'})
        } 






    }catch(error){console.log(error)}

}



exports.forgotpassword = async (req, res) => {
    const { email } = req.body;

  // Find the user by email (in a real app, this would query a database)
  const user = await User.findOne({email});

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Generate a reset token with user's ID
  const resetToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

  // Here, you would typically send the reset token through email or another channel
  
  console.log("Reset Token:", resetToken);
  /*
  return res.json({ message: 'Reset token sent successfully' });
  */
}
exports.resetpassword = async(req,res)=>{
    const {email, newPassword } = req.body;
    

  // Verify the reset token
  jwt.verify(resetToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Token is valid, find the user by userId (in a real app, this would query a database)
    const user = User.findOne({email});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's password (in a real app, you'd update the database)
    User.password = newPassword;

    return res.json({ message: 'Password updated successfully' });
  });

}
   

        
        
  

exports.signout = async(req,res)=>{
    try{
        const{ email, password } = req.body
        const user = await User.findOne({ email })
        User.findByIdAndUpdate(user._id, { token: "" }, { new: true })
                .then(updatedUser => {
                    if (!updatedUser) {
                    console.log('User not found');
                    return;
                    }
                    console.log('User updated with new token:', updatedUser);
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });

    }catch(error){

    }
}




exports.token = async(req,res)=>{
    try{
        const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token is required' });
    }
  
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Refresh token is not valid' });
      }
  
      // Assuming the refresh token is valid, generate a new access token
      const accessToken = jwt.sign({ userId: decoded.userId, username: decoded.email }, ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
  
      res.json({ accessToken });
    });
    }catch(error){
        res.status(400).json({error})
    
    }
    
} 


exports.authenticateToken = async(req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access token is required' });
    }
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Access token is not valid' });
      }
      req.user = user;
      next();

    });
    }catch(error){
        res.status(400).json({error})
    
    }
    
} 












