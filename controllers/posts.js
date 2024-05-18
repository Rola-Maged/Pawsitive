/* const Posts=require(". /model/product")


//create 
 exports.createPost=async(req,res)=>{  
    const post=new Posts({
    
    title:req.body.title,
     description:req.body.description
    })
    
    try {  
    const postsave=await post.save();
    res.json(postsave)
     } catch (error) {  
    console. log(error); 
    }
}   

//Getting all posts 
exports.getPost=async (req,res)=>{  

    try {  

    const posts=await Posts.find()

    res.json (posts)

    }catch (error) {
    res.send ("Error", error)

    } 
}


//Reading a single post 

exports. findSinglePost=async(req,res)=>{ 

try { 
    const posts=await Posts.findById(req. params.id)
res. json (posts)

} catch (error) {
    res.send ("Error", error)
}

}


//Update
exports.updatePost=async(req,res)=>{

    const postsUpdate=await Posts. findOneAndUpdate(req.params.id,req.body,{new:true})

    res.json (postsUpdate)

}

//Deleting a Post

exports.deletePost=async(req,res)=>{

try { 

const postsDelete=await Posts.findByIdAndRemove(req.params.id)

res.json(postsDelete)

// res.send( "Message deleted successfulLy")

} catch (error) {
    console. log (error)

}
}
*/
 

app.get('/categories/:categoryId/products', async (req, res) => {
    const categoryId = req.params.categoryId;

    // Find the category and populate its products
    const category = await category.findById(categoryId).populate('product').exec();

    res.json(category.product);
});

// Route to create a new appointment
app.post("/appointments", (req, res) => {
    const appointment = req.body;
    appointmentsCollection.insertOne(appointment, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating appointment");
        return;
      }

      console.log(`Created appointment with id ${result.insertedId}`);
      res.send(result.ops[0]);
    });
  });

// Route to get all appointments
app.get("/appointments", (req, res) => {
    appointmentsCollection.find({}).toArray((err, appointments) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error getting appointments");
        return;
      }

      res.send(appointments);
    });
  });

  // Route to get a single appointment by ID
  app.get("/appointments/:id", (req, res) => {
    const id = req.params.id;
    appointmentsCollection.findOne(
      { _id: new ObjectId(id) },
      (err, appointment) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error getting appointment");
          return;
        }

        if (!appointment) {
          res.status(404).send(`Appointment with id ${id} not found`);
          return;
        }

        res.send(appointment);
      }
    );
  });


  // Route to update an appointment by ID
  app.put("/appointments/:id", (req, res) => {
    const id = req.params.id;
    const appointment = req.body;
    appointmentsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: appointment },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error updating appointment");
          return;
        }

        if (!result) {
          res.status(404).send(`Appointment with id ${id} not found`);
          return;
        }

        res.send(result);
      }
    );
  });

