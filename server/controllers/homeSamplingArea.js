const HomeSamplingArea = require("../models/homeSamplingArea");

const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");

const createHomeSamplingArea = async (req, res) => {
    try {
        const { name, extraCharge } = req.body;

        if (!name || !name.trim()) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "Area name is required"
            );
        }

        if (
            extraCharge === undefined ||
            typeof extraCharge !== "number" ||
            !Number.isFinite(extraCharge) ||
            extraCharge < 0
        ) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"A valid non-negative extra charge is required");
        }

        const newArea = await HomeSamplingArea.create({
            name: name.trim(),
            extraCharge
        });

        return responseHandler(res,StatusCodes.INSERTED,"Home sampling area created successfully",newArea);

    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.CONFLICT,"This home sampling area already exists");
        }

        console.error("Create home sampling area error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to create home sampling area"
        );
    }
};

const getHomeSamplingAreas = async (req, res) => {
    try {
       const areas = await HomeSamplingArea.find({ isActive: true })
    .sort({ name: 1 });

        return responseHandler(res,StatusCodes.SUCCESS,"Home sampling areas fetched successfully",areas);

    } catch (error) {
        console.error("Get home sampling areas error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to fetch home sampling areas");
    }
};

const mongoose = require("mongoose");

const updateHomeSamplingArea = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, extraCharge } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid home sampling area ID");
        }

        const updateData = {};
        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return responseHandler(res,StatusCodes.BAD_REQUEST,"Area name cannot be empty");
            }

            updateData.name = name.trim();
        }

        if (extraCharge !== undefined) {
            if (
                typeof extraCharge !== "number" ||
                !Number.isFinite(extraCharge) ||
                extraCharge < 0
            ) {
                return responseHandler(res,StatusCodes.BAD_REQUEST,"Extra charge must be a non-negative number");
            }

            updateData.extraCharge = extraCharge;
        }

        if (Object.keys(updateData).length === 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Provide at least one field to update");
        }

        const updatedArea = await HomeSamplingArea.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedArea) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Home sampling area not found"   );
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Home sampling area updated successfully",updatedArea);

    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.CONFLICT,"This home sampling area name already exists");
        }
        console.error("Update home sampling area error:", error);
        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to update home sampling area");
    }
};


const deactivateHomeSamplingArea = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid home sampling area ID");
        }

        const area = await HomeSamplingArea.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!area) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Home sampling area not found");
        }

        return responseHandler(
            res,
            StatusCodes.SUCCESS,
            "Home sampling area deactivated successfully",
            area
        );

    } catch (error) {
        console.error("Deactivate home sampling area error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to deactivate home sampling area");
    }
};

module.exports = {createHomeSamplingArea,getHomeSamplingAreas,updateHomeSamplingArea,deactivateHomeSamplingArea};