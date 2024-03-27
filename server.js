const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const router = require("./routes/user")
//const db = require("./models/login.model")


app.use(express.json())
app.use(cors())
app.get("/", (req,res)=>{
    res.send("HEllo People")
})

app.use("/api", router)

mongoose.connect('mongodb+srv://sherifyanni02:A8WQ1bDXnO219oxz@backenddb.qwaqyzc.mongodb.net/',{
  dbName: `pawsitive`,
  // useNewParser: true,
  // useUnifiedTopology: true,
})
  .then(() => {
      console.log("Connected to DB")
      app.listen(8000, ()=>{
        console.log("Server is running")
    })
  })
  .catch(()=>{
      console.log("Error connecting")

  })








