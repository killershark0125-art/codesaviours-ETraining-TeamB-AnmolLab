
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "FAQ question is required"],
            trim: true,
            minlength: 5
        },

        answer: {
            type: String,
            required: [true, "FAQ answer is required"],
            trim: true,
            minlength: 2
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

module.exports = mongoose.model("FAQ", faqSchema);
