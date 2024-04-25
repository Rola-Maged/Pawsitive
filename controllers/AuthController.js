const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Joi = require("joi");
// const sendEmail = require("../utils/sendEmail")
dotenv.config();
const express = require("express");
const { user} = require("../models/user");
const { vet } = require("../models/vet");
const { shop } = require("../models/shop");

ACCESS_TOKEN_SECRET = "hello";
REFRESH_TOKEN_SECRET = "helloAgain";

const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());



exports.signup = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      address,
      gender,
      age,
      phone,
    } = req.body;

    // Check If The Input Fields are Valid
    if (
      !name ||
      !password ||
      !email ||
      !address ||
      !gender ||
      !age    ||
      !phone
    ) {
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
      gender,
      phone,
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



exports.shopsignup = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      address,
      phone,
      taxRegister,
      offerings,
    } = req.body;

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
    const { name, password, email, address, phone, syndicateCard } =
      req.body;

    // Check If The Input Fields are Valid
    if (
      !name ||
      !password ||
      !email ||
      !address ||
      !phone ||
      !syndicateCard
    ) {
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
    } else if (checkShop) {
      const comparePass2 = await bcrypt.compare(password, checkShop.password);
    } else {
      const comparePass3 = await bcrypt.compare(password, checkVet.password);
    }

    if (checkUser) {
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
    } else if (checkShop) {
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
    } else {
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
  } catch (error) {
    console.log(error);
  }
};

exports.forgotpassword = async (req, res) => {
  const { email } = req.body;

  // Find the user by email (in a real app, this would query a database)
  const user = await user.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate a reset token with user's ID
  const resetToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  // Here, you would typically send the reset token through email or another channel

  console.log("Reset Token:", resetToken);
  /*
  return res.json({ message: 'Reset token sent successfully' });
  */
};
exports.resetpassword = async (req, res) => {
  const { email, newPassword } = req.body;

  // Verify the reset token
  jwt.verify(resetToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Token is valid, find the user by userId (in a real app, this would query a database)
    const user = user.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password (in a real app, you'd update the database)
    user.password = newPassword;

    return res.json({ message: "Password updated successfully" });
  });
};

exports.resetPassword = async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await user.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
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
