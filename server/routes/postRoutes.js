const express = require("express");
const router = express.Router();

const {createPost,getAllPosts,getPostById,updatePost,deletePost} = require("../controllers/post");


router.post("/newPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:id", getPostById);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);


module.exports = router;