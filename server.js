const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/user")



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
      app.listen(8000, ()=>{
        console.log("Server is running")
    })
  })
  .catch(()=>{
      console.log("Error connecting")

  })








