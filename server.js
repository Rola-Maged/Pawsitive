const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/user")
const bodyParser = require("body-parser")
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const uploadRoute = require('./routes/user');
const { UploadcareClient } = require('@uploadcare/rest-client');


app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', uploadRoute);


app.use(express.json())
app.get("/", (req,res)=>{
    res.send("HEllo People")
})

app.use("/api", router)

mongoose.connect('mongodb+srv://sherifyanni02:A8WQ1bDXnO219oxz@backenddb.qwaqyzc.mongodb.net/',{
  dbName: `pawsitive`,
})
  .then(() => {
      console.log("Connected to DB")
      const port = process.env.PORT || 8000; 
      app.listen(port, ()=>{
      console.log(`Listening on port ${port}...`)
    })
  })
  .catch(()=>{
      console.log("Error connecting")

  })

   
