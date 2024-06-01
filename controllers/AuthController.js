const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Joi = require("joi");
const nodemailer = require("nodemailer");
// const sendEmail = require("../utils/sendEmail")
dotenv.config();
const express = require("express");
const { user,validate } = require("../models/user");
const { vet } = require("../models/vet");
const { shop } = require("../models/shop");


ACCESS_TOKEN_SECRET = "hello";
REFRESH_TOKEN_SECRET = "helloAgain";

const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sherifemad08@gmail.com", // Your Gmail address
    pass: "hhvm tzoj vrfp lcid", // Your Gmail password or App Password
  },
});

exports.signup = async (req, res) => {
  try {
    const { name, password, email, address, gender, age, phone, role } = req.body;

    // Check If The Input Fields are Valid
    if (!name || !password || !email || !address || !gender || !age || !phone ) {
      return res
        .status(400)
        .json({ message: "Please Input the Required Fields" });
    }

    // Check If User Exists In The Database
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save The User To The Database
    const newUser = new user({
      name,
      password: hashedPassword,
      email,
      address,
      age,
      role,
      gender,
      phone,
    });

    await newUser.save();
    const accessToken = jwt.sign(
      { userId: user.id, name: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" },
    )
    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser, accessToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};


exports.shopsignup = async (req, res) => {
  try {
    const { name, password, email, address, phone, taxRegister, offerings } =
      req.body;

    // Check If The Input Fields are Valid
    if (
      !name ||
      !password ||
      !email ||
      !address ||
      !phone ||
      !taxRegister ||
      !offerings
    ) {
      return res
        .status(400)
        .json({ message: "Please Input the Required Fields" });
    }

    // Check If User Exists In The Database
    const existingUser = await shop.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save The User To The Database
    const newUser = new shop({
      name,
      password: hashedPassword,
      email,
      address,
      phone,
      taxRegister,
      offerings,
    });

    await newUser.save();
    const accessToken = jwt.sign(
      { userId: shop.id, name: shop.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" },
    )

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
      
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

exports.vetsignUp = async (req, res) => {
  try {
    const { name, password, email, address, phone, syndicateCard } = req.body;

    // Check If The Input Fields are Valid
    if (!name || !password || !email || !address || !phone || !syndicateCard) {
      return res
        .status(400)
        .json({ message: "Please Input the Required Fields" });
    }

    // Check If User Exists In The Database
    const existingUser = await vet.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save The User To The Database
    const newUser = new vet({
      name,
      password: hashedPassword,
      email,
      address,
      phone,
      syndicateCard,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const checkUser = await user.findOne({ email });
    const checkShop = await shop.findOne({ email });
    const checkVet = await vet.findOne({ email });
    console.log(checkShop);
    console.log(checkUser);
    if (!checkUser && !checkShop && !checkVet) {
      return res.json({
        status: "error",
        error: "Invalid username or password",
      });
    }
    console.log(password);
    if (checkUser) {
      const comparePass = await bcrypt.compare(password, checkUser.password);
      if (!comparePass) {
        res.json({
          status: 403,
          error: "Invalid Username or Password",
        });
      }

      if (comparePass) {
        const accessToken = jwt.sign(
          { userId: user.id, name: user.email },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "2m" },
        );

        const refreshToken = jwt.sign(
          { userId: user.id, name: user.email },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );

        res.json({ accessToken, refreshToken, checkUser });
      }
    } else if (checkShop) {
      const comparePass2 = await bcrypt.compare(password, checkShop.password);
      if (!comparePass2) {
        res.json({
          status: 403,
          error: "Invalid Username or Password",
        });
      }
      if (comparePass2) {
        const accessToken = jwt.sign(
          { userId: shop.id, name: shop.email },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "2m" },
        );

        const refreshToken = jwt.sign(
          { userId: shop.id, name: shop.email },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );

        res.json({ accessToken, refreshToken, checkShop });
      }
    } else {
      const comparePass3 = await bcrypt.compare(password, checkVet.password);
      if (!comparePass3) {
        res.json({
          status: 403,
          error: "Invalid Username or Password",
        });
      }
      if (comparePass3) {
        const accessToken = jwt.sign(
          { userId: vet.id, name: vet.email },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "2m" },
        );

        const refreshToken = jwt.sign(
          { userId: vet.id, name: vet.email },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );

        res.json({ accessToken, refreshToken });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgotpassword = async (req, res) => {
  const { email } = req.body;

  // Find the user by email (in a real app, this would query a database)
  const findUser = await user.findOne({ email });
  const findUser2 = await shop.findOne({ email });
  const findUser3 = await vet.findOne({ email });
  console.log(findUser);
  console.log(findUser2);
  console.log(findUser3);

  if (!findUser && !findUser2 && !findUser3) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate a reset token with user's ID
  console.log(findUser);
  if (findUser) {
    const resetToken = jwt.sign({ userId: findUser._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    console.log("Reset Token:", resetToken);
    const mailOptions = {
      from: "sherifemad08@gmail.com",
      to: email,
      subject: "Password Reset",
      text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://localhost:8000/api/reset/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    });
  } else if (findUser2) {
    const resetToken = jwt.sign(
      { userId: findUser2._id },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      },
    );
    console.log("Reset Token:", resetToken);
    const mailOptions = {
      from: "sherifemad08@gmail.com",
      to: email,
      subject: "Password Reset",
      text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://localhost:8000/reset/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    });
  } else {
    const resetToken = jwt.sign(
      { userId: findUser3._id },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      },
    );
    console.log("Reset Token:", resetToken);
    const mailOptions = {
      from: "sherifemad08@gmail.com",
      to: email,
      subject: "Password Reset",
      text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://localhost:8000/reset/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    });
  }
};

exports.myReset = async (req, res) => {
  const resetToken = req.params.token;
  const newPassword = req.body.newPassword;
  console.log(newPassword);

  try {
    // Find user by reset password token and check if it's still valid
    const decodedToken = jwt.verify(resetToken, ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);

    // Find user by ID
    const findUser = await user.findById(userId);
    const findUser2 = await shop.findById(userId);
    const findUser3 = await vet.findById(userId);

    if (!findUser && !findUser2 && !findUser3) {
      return res.status(400).json({ error: "User not found" });
    }

    if (findUser) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      findUser.password = hashedPassword;
      await findUser.save();

      res.json({ message: "Password reset successful" });
    } else if (findUser2) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      findUser2.password = hashedPassword;
      await findUser2.save();

      res.json({ message: "Password reset successful" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      findUser3.password = hashedPassword;
      await findUser3.save();

      res.json({ message: "Password reset successful" });
    }
    // Update user's password
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.token = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token is required" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Refresh token is not valid" });
      }

      // Assuming the refresh token is valid, generate a new access token
      const accessToken = jwt.sign(
        { userId: decoded.userId, username: decoded.email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "2m" },
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token is required" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Access token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
