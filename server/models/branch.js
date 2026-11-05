const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Branch name is required"],
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

        address: {
            type: String,
            required: [true, "Branch address is required"],
            trim: true
        },

        phone: {
            type: String,
            required: [true, "Branch phone number is required"],
            trim: true
        },

        timings: {
            type: String,
            required: [true, "Branch timings are required"],
            trim: true
        },

        mapEmbedUrl: {
            type: String,
            default: ""
        },

        directionsUrl: {
            type: String,
            default: ""
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

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;