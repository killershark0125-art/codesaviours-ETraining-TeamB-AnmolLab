const Post = require("../models/post");
const {generatePostSlug,validatePostData} = require("../validations/postValidation");

const { StatusCodes } = require("../consts/statusCode");
const responseHandler = require("../utils/responseHandler");


const createPost = async (req, res) => {
    try {
        const { title, excerpt, content, coverImage, author, isPublished } = req.body;

        const validation = validatePostData(req.body);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors: validation.errors });
        }

        const slug = generatePostSlug(title);

        const existingPost = await Post.findOne({ slug });

        if (existingPost) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"A blog post with this title already exists");
        }

        const post = await Post.create({title,slug,excerpt,content,coverImage,author,isPublished: isPublished ?? false,publishedAt: isPublished ? new Date() : null});

        return responseHandler(res,StatusCodes.INSERTED,"Blog post created successfully",post);

    } catch (error) {
        console.error("Create post error:", error);

        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Blog post already exists");
        }

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to create blog post");
    }
};



const getAllPosts = async (req, res) => {
    try {
        const filter = {};

        if (req.query.isPublished !== undefined) {
            if (!["true", "false"].includes(req.query.isPublished)) {
                return responseHandler(res,StatusCodes.BAD_REQUEST,"isPublished must be true or false");
            }

            filter.isPublished = req.query.isPublished === "true";
        }

        const posts = await Post.find(filter).sort({ createdAt: -1 });

        return responseHandler(res,StatusCodes.SUCCESS,"Blog posts retrieved successfully",posts);

    } catch (error) {
        console.error("Get posts error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to retrieve blog posts");
    }
};


const getPostById = async (req, res) => {
    try {
        if (!require("mongoose").Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid blog post ID");
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Blog post not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Blog post retrieved successfully",post);

    } catch (error) {
        console.error("Get post error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to retrieve blog post");
    }
};



const updatePost = async (req, res) => {
    try {
        if (!require("mongoose").Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid blog post ID");
        };

        const post = await Post.findById(req.params.id);
        

        if (!post) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Blog post not found");
        }
        const mergedData = {
             title: req.body.title ?? post.title,
             excerpt: req.body.excerpt ?? post.excerpt,
             content: req.body.content ?? post.content,
             coverImage: req.body.coverImage ?? post.coverImage,
             author: req.body.author ?? post.author,
             isPublished: req.body.isPublished ?? post.isPublished
        };

      const validation = validatePostData(mergedData);

if (!validation.isValid) {
    return responseHandler(
        res,
        StatusCodes.BAD_REQUEST,
        "Validation failed",
        null,
        { errors: validation.errors }
    );
}

        const updateData = { ...req.body };

        if (updateData.title !== undefined) {
            updateData.slug = generatePostSlug(updateData.title);
        }

        if (updateData.isPublished === true && !post.isPublished) {
            updateData.publishedAt = new Date();
        }

        if (updateData.isPublished === false) {
            updateData.publishedAt = null;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return responseHandler(res,StatusCodes.SUCCESS,"Blog post updated successfully",updatedPost);

    } catch (error) {
        console.error("Update post error:", error);

        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Another blog post already uses this title");
        }

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to update blog post");
    }
};


const deletePost = async (req, res) => {
    try {
        if (!require("mongoose").Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid blog post ID" );
        }

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Blog post not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Blog post deleted successfully",post);

    } catch (error) {
        console.error("Delete post error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to delete blog post");
    }
};


module.exports = {createPost,getAllPosts,getPostById,updatePost,deletePost};