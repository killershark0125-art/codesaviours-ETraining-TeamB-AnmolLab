
const mongoose = require("mongoose");

const Package = require("../models/package");
const Test = require("../models/test");

const {generatePackageSlug,validatePackageData} = require("../validations/packageValidation");
const { StatusCodes } = require("../consts/statusCode");
const responseHandler = require("../utils/responseHandler");



const calculatePackagePricing = async (includedTests, discountPercentage) => {
    const uniqueTestIds = [...new Set(includedTests.map(id => id.toString()))];
    const tests = await Test.find({_id: { $in: uniqueTestIds }});

    if (tests.length !== uniqueTestIds.length) {
        throw new Error("One or more included tests were not found");
    }

    const unavailableTest = tests.find(
        test => !test.isActive || test.priceStatus !== "confirmed" ||
                typeof test.price !== "number"
    );

    if (unavailableTest) {
        throw new Error(
            `Test "${unavailableTest.name}" is inactive or its price is not confirmed`
        );
    }

    const originalPrice = tests.reduce(
        (total, test) => total + test.price,
        0
    );

    const packagePrice = Number(
        (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
    );

    const savings = Number((originalPrice - packagePrice).toFixed(2));

    return {originalPrice,packagePrice,savings};
};



const createPackage = async (req, res) => {
    try {
        const errors = validatePackageData(req.body);

        if (errors.length > 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors });
        }

        const {name,description = "",includedTests,discountPercentage = 0,isActive = true} = req.body;

        const slug = generatePackageSlug(name);

        const existingPackage = await Package.findOne({
            $or: [{ name: name.trim() },{ slug }]
        });

        if (existingPackage) {
            return responseHandler(res,StatusCodes.CONFLICT,"Package already exists");
        }

        const pricing = await calculatePackagePricing(includedTests,Number(discountPercentage));
        

        const newPackage = await Package.create({
            name: name.trim(),
            slug,
            description,
            includedTests,
            discountPercentage: Number(discountPercentage),
            isActive,
            ...pricing
        });

        const populatedPackage = await Package.findById(newPackage._id)
            .populate("includedTests", "name slug price priceStatus");

        return responseHandler(
            res,StatusCodes.INSERTED,"Package created successfully",populatedPackage);

    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.CONFLICT,"Package name or slug already exists");
        }

        if (error.name === "ValidationError") {
            return responseHandler(res,StatusCodes.BAD_REQUEST,error.message);
        }

        return responseHandler(res,StatusCodes.BAD_REQUEST,error.message );
    }
};


const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find()
            .populate("includedTests", "name slug price priceStatus")
            .sort({ createdAt: -1 });

        return responseHandler(res,StatusCodes.SUCCESS,"Packages fetched successfully",packages);

    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,error.message);
    }
};


const getPackageById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid package ID");
        }

        const packageData = await Package.findById(req.params.id)
            .populate("includedTests", "name slug price priceStatus");

        if (!packageData) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Package not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Package fetched successfully",packageData);

    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,error.message);
    }
};



const updatePackage = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid package ID");
        }

        const packageData = await Package.findById(req.params.id);

        if (!packageData) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Package not found");
        }

        const updateData = {...req.body};

        const errors = validatePackageData({
            name: updateData.name ?? packageData.name,
            includedTests: updateData.includedTests ?? packageData.includedTests,
            discountPercentage:
                updateData.discountPercentage ?? packageData.discountPercentage,
            isActive: updateData.isActive ?? packageData.isActive
        });

        if (errors.length > 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors });
        }

        if (updateData.name !== undefined) {
            updateData.slug = generatePackageSlug(updateData.name);
        }

        const includedTests = updateData.includedTests ?? packageData.includedTests;

        const discountPercentage = Number(updateData.discountPercentage ?? packageData.discountPercentage);

        const pricing = await calculatePackagePricing(includedTests,discountPercentage);

        Object.assign(updateData, pricing);
        updateData.discountPercentage = discountPercentage;

        const updatedPackage = await Package.findByIdAndUpdate(req.params.id,updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate("includedTests", "name slug price priceStatus");

        return responseHandler(res,StatusCodes.SUCCESS,"Package updated successfully",updatedPackage);

    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.CONFLICT,"Package name or slug already exists");
        }

        return responseHandler(res,StatusCodes.BAD_REQUEST,error.message);
    }
};



const deletePackage = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid package ID");
        }

        const deletedPackage = await Package.findByIdAndDelete(req.params.id);

        if (!deletedPackage) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Package not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Package deleted successfully");

    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,error.message);
    }
};


module.exports = {createPackage,getAllPackages,getPackageById,updatePackage,deletePackage};
