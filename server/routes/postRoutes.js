const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createPost,getAllPosts,getPostById,updatePost,deletePost} = require("../controllers/post");


router.post("/newPost", protect, authorizeRoles("Admin"), createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:id", getPostById);
router.put("/updatePost/:id", protect, authorizeRoles("Admin"), updatePost);
router.delete("/deletePost/:id", protect, authorizeRoles("Admin"), deletePost);


module.exports = router;