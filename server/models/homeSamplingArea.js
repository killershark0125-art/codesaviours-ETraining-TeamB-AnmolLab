
const mongoose = require("mongoose");

const homeSamplingAreaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Area name is required"],
            trim: true,
            unique: true
        },

        extraCharge: {
            type: Number,
            required: [true, "Home sampling charge is required"],
            min: [0, "Extra charge cannot be negative"]
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

module.exports = mongoose.model( "HomeSamplingArea", homeSamplingAreaSchema);
