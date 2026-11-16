
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        patientDetails: {
            fullName: {
                type: String,
                required: true,
                trim: true
            },
            phone: {
                type: String,
                required: true,
                trim: true
            },
            age: {
                type: Number,
                required: true,
                min: 0
            },
            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
                required: true
            },
            relationship: {
                type: String,
                default: "Self",
                trim: true
            }
        },

        serviceType: {
            type: String,
            enum: ["Branch", "Home"],
            required: true
        },

        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null
        },

        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot",
            required: true
        },

        homeCollection: {
    address: {
        type: String,
        trim: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HomeSamplingArea",
        required: true
    },
    areaName: {
        type: String,
        required: true,
        trim: true
    },
    extraCharge: {
        type: Number,
        default: 0,
        min: 0
    }
},

        tests: [
            {
                test: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Test",
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        packages: [
            {
                package: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Package",
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        paymentMethod: {
            type: String,
            enum: ["Cash"],
            default: "Cash"
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending"
        },

        status: {
            type: String,
            enum: [
                "Booked",
                "Sample collected",
                "Processing",
                "Report ready",
                "Completed",
                "Cancelled"
            ],
            default: "Booked"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
