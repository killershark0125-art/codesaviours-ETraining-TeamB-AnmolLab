const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Test name is required"],
            unique: true,
            trim: true,
            maxlength: [100, "Test name must be less than 100 characters"]
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true
        },
        code:{
            type: String,
            trim: true,
            uppercase: true,
            sparse: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Test category is required"]
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        sampleType: {
            type: String,
            trim: true,
            default: ""
        },
        preparationInstructions: {
            type: String,
            trim: true,
            default: ""
        },
        turnaroundTime: {
            type: String,
            trim: true,
            default: ""
        },
        price: {
            type: Number,
            min: [0, "Price must be a positive number"],
            default: null
        },
        priceStatus: {
            type: String,
            enum: ["pending","confirmed"],
            default: "pending"
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Test", testSchema);