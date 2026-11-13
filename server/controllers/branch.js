
const Branch = require("../models/branch");
const {generateBranchSlug,validateBranchData} = require("../validations/branchValidation");

const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");


const createBranch = async (req, res) => {
    try {
        const errors = validateBranchData(req.body);

        if (errors.length > 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors });
        }

        const { name, address, phone, timings, mapEmbedUrl, directionsUrl, isActive } = req.body;

        const slug = generateBranchSlug(name);

        const existingBranch = await Branch.findOne({$or: [{ name: name.trim() }, { slug }]});

        if (existingBranch) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Branch already exists");
        }

        const branch = await Branch.create({name,slug,address,phone,timings,mapEmbedUrl,directionsUrl,isActive});

        return responseHandler(res,StatusCodes.INSERTED,"Branch created successfully",branch);
     } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Branch name or slug already exists");
        }

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to create branch",null,{ error: error.message });
    }
};


const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find({ isActive: true }).sort({ createdAt: -1 });

        return responseHandler(res,StatusCodes.SUCCESS,"Branches fetched successfully",branches);
    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to fetch branches",null,{ error: error.message });
    }
};


const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!require("mongoose").Types.ObjectId.isValid(id)) {
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Invalid branch ID");
        }

        const branch = await Branch.findOne({
             _id: id,
             isActive: true
          });

        if (!branch) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Branch not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Branch fetched successfully",branch);
    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to fetch branch",null,{ error: error.message });
    }
};


const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;

        if (!require("mongoose").Types.ObjectId.isValid(id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid branch ID");
        }

        const errors = validateBranchData(req.body);

        if (errors.length > 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors });
        }

        const { name, address, phone, timings, mapEmbedUrl, directionsUrl, isActive } = req.body;

        const slug = generateBranchSlug(name);

        const existingBranch = await Branch.findOne({
            _id: { $ne: id },
            $or: [{ name: name.trim() }, { slug }]
        });

        if (existingBranch) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Another branch with this name already exists");
        }

        const branch = await Branch.findByIdAndUpdate(
            id,
            {name,slug,address,phone,timings,mapEmbedUrl,directionsUrl,isActive},
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!branch) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Branch not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Branch updated successfully",branch);
    } catch (error) {
        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.ALREADY_EXIST,"Branch name or slug already exists");
        }

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to update branch",null,{ error: error.message });
    }
};


const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;

        if (!require("mongoose").Types.ObjectId.isValid(id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid branch ID");
        }

        const branch = await Branch.findByIdAndDelete(id);

        if (!branch) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Branch not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Branch deleted successfully",branch);
    } catch (error) {
        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to delete branch",null,{ error: error.message });
    }
};

module.exports = {createBranch,getAllBranches,getBranchById,updateBranch,deleteBranch};
