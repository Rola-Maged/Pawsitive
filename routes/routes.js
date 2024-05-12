const PostsController=require("./controller/posts");
router.get('/posts',PostsController.getPost);
router.get('/posts/:id',PostsController.findSinglePost);
router.put('/posts/:id',PostsController.updatePost);
router.delete('/posts/:id',PostsController.deletePost);