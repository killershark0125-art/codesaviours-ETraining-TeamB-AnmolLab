const Slot = require("../models/slot");
const validateSlot = require("../validations/slotValidation");

const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");

const createSlot = async (req, res) => {
    try {
        const error = await validateSlot(req.body);

        if (error) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                error
            );
        }

        const {
            serviceType,
            branch,
            date,
            startTime,
            endTime,
            capacity
        } = req.body;

        const slot = await Slot.create({
            serviceType,
            branch: serviceType === "Branch" ? branch : null,
            date: new Date(date),
            startTime,
            endTime,
            capacity
        });

        return responseHandler(
            res,
            StatusCodes.INSERTED,
            "Slot created successfully",
            slot
        );

    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(
                res,
                StatusCodes.ALREADY_EXIST,
                "This time slot already exists"
            );
        }

        console.error("Create slot error:", error);

        return responseHandler(
            res,
            StatusCodes.SERVER_ERROR,
            "Failed to create slot"
        );
    }
};

const getAvailableSlots = async (req, res) => {
    try {
        const { serviceType, date, branch } = req.query;

        if (!["Branch", "Home"].includes(serviceType)) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "Service type must be Branch or Home"
            );
        }

        if (!date || Number.isNaN(new Date(date).getTime())) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "A valid date is required"
            );
        }

        if (serviceType === "Branch") {
            if (!branch || !require("mongoose").Types.ObjectId.isValid(branch)) {
                return responseHandler(
                    res,
                    StatusCodes.BAD_REQUEST,
                    "A valid branch ID is required"
                );
            }
        }

        const selectedDate = new Date(date);

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
            serviceType,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            isActive: true,
            $expr: {
                $lt: ["$bookedCount", "$capacity"]
            }
        };

        if (serviceType === "Branch") {
            filter.branch = branch;
        } else {
            filter.branch = null;
        }

        const slots = await Slot.find(filter)
            .populate("branch", "name address")
            .sort({ startTime: 1 });

        return responseHandler(
            res,
            StatusCodes.SUCCESS,
            "Available slots fetched successfully",
            slots
        );

    } catch (error) {
        console.error("Get available slots error:", error);

        return responseHandler(
            res,
            StatusCodes.SERVER_ERROR,
            "Failed to fetch available slots"
        );
    }
};

module.exports = { createSlot , getAvailableSlots};