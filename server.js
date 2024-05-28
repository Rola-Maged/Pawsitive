const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/user")
const bodyParser = require("body-parser")
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));


AWS.config.update({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
  region: 'us-east-1'
});


const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'pawsitiveapp-bucket',
      acl: 'public-read',
      key: (req, file, cb) => {
          cb(null, Date.now().toString() + path.extname(file.originalname));
      }
  })
});

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.json({ message: 'File uploaded successfully.', file: req.file });
});



app.use(express.static('public'));

// server.js (additional code)
app.get('/images', async (req, res) => {
  try {
      const params = {
          Bucket: 'pawsitiveapp-bucket'
      };
      const data = await s3.listObjectsV2(params).promise();
      const imageUrls = data.Contents.map(item => {
          return {
              url: s3.getSignedUrl('getObject', {
                  Bucket: 'YOUR_BUCKET_NAME',
                  Key: item.Key,
                  Expires: 60 * 5 // URL expires in 5 minutes
              })
          };
      });
      res.json(imageUrls);
  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images.' });
  }
});



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

   
