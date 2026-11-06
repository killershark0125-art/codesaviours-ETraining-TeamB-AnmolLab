
const Inquiry = require("../models/inquiry");
const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");
const { validateInquiryData } = require("../validations/inquiryValidation");


const submitInquiry = async (req, res) => {
    try {
        const validation = validateInquiryData(req.body);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",validation.errors);
        }

        const inquiry = await Inquiry.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || "",
            subject: req.body.subject,
            message: req.body.message,
            status: "new"
        });

        return responseHandler(res,StatusCodes.INSERTED,"Inquiry submitted successfully",inquiry);
    } catch (error) {
        console.error("Submit inquiry error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to submit inquiry");
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        return responseHandler(res,StatusCodes.SUCCESS,"Inquiries fetched successfully",inquiries);
    } catch (error) {
        console.error("Get inquiries error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to fetch inquiries");
    }
};

const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Inquiry not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"Inquiry fetched successfully",inquiry );
    } catch (error) {
        console.error("Get inquiry by ID error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid inquiry ID");
    }
};

const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Inquiry not found");
        }

        const mergedData = {
            name: req.body.name ?? inquiry.name,
            email: req.body.email ?? inquiry.email,
            phone: req.body.phone ?? inquiry.phone,
            subject: req.body.subject ?? inquiry.subject,
            message: req.body.message ?? inquiry.message,
            status: req.body.status ?? inquiry.status
        };

        const validation = validateInquiryData(mergedData);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",validation.errors );
        }

        inquiry.name = mergedData.name;
        inquiry.email = mergedData.email;
        inquiry.phone = mergedData.phone;
        inquiry.subject = mergedData.subject;
        inquiry.message = mergedData.message;
        inquiry.status = mergedData.status;

        await inquiry.save();

        return responseHandler(res,StatusCodes.SUCCESS,"Inquiry updated successfully",inquiry);
    } catch (error) {
        console.error("Update inquiry error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Failed to update inquiry");
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Inquiry not found");
        }

        await Inquiry.findByIdAndDelete(req.params.id);

        return responseHandler(res,StatusCodes.SUCCESS,"Inquiry deleted successfully");
    } catch (error) {
        console.error("Delete inquiry error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid inquiry ID");
    }
};

module.exports = {submitInquiry,getAllInquiries,getInquiryById,updateInquiry,deleteInquiry};