const router = require("express").Router();
const User = require("../models/login.model")


router.route("/").get((req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: "+ err));
});


router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const newName = new User(name)
    const newPass = new User(password)





    newName.save()
    .then(() => res.json("Name added"))
    .catch(err => res.status(400).json("Error: "+ err));


    newPass.save()
    .then(() => res.json("Pass added"))
    .catch(err => res.status(400).json("Error: "+ err));
});


module.exports = router;