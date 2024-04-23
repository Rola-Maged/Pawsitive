const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/user")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


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

   