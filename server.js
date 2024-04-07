const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://rola:Aslaz30@cluster0.4v1ldwr.mongodb.net/")
require("dotenv").config();
const express = require("express");
const app = express();
const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");
 

app.use(express.json());

app.use("/api/users", users);
app.use("/api/password-reset", passwordReset);

connect.then(()=> {
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database cannot be connectd")
});


 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));