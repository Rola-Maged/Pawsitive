const Posts=require(". /model/Posts")


//create 
 exports. createPost=async(req,res)=>{  
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

