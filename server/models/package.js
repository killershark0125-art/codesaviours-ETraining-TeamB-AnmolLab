
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Package name is required"],
            unique: true,
            trim: true,
            minlength: 2
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        description: {
            type: String,
            default: ""
        },

        includedTests: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: true
            }
        ],

        discountPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        originalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        packagePrice: {
           type: Number,
           required: true,
           min: 0
        },

        savings: {
           type: Number,
           required: true,
           min: 0
       },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);



module.exports = mongoose.model("Package", packageSchema);
