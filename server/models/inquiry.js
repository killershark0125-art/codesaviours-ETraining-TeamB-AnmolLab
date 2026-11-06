
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            trim: true,
            default: ""
        },

        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true
        },

        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            minlength: 10
        },

        status: {
            type: String,
            enum: ["new", "in-progress", "resolved"],
            default: "new"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
