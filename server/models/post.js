
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            minlength: 3
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        excerpt: {
            type: String,
            required: [true, "Blog excerpt is required"],
            trim: true
        },

        content: {
            type: String,
            required: [true, "Blog content is required"]
        },

        coverImage: {
            type: String,
            default: ""
        },

        author: {
            type: String,
            default: "Anmol Lab",
            trim: true
        },

        isPublished: {
            type: Boolean,
            default: false
        },

        publishedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);



module.exports = mongoose.model("Post", postSchema);
