const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"category name is required"],
            unique: true,
            trim: true,
            maxlength: [100,"category name must be less than 100 characters"]
        },
        slug:{
            type: String,
            unique: true,
            trim: true,
            lowercase: true
        },
        description:{
            type: String,
            trim: true,
            maxlength: [500,"category description must be less than 500 characters"],
            default: ""
        },
        isActive:{
            type: Boolean,
            default: true
        }
},
    {timestamps: true}
);


module.exports = mongoose.model("Category", categorySchema);