
const FAQ = require("../models/faq");
const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");
const { validateFAQData } = require("../validations/faqValidation");


const createFAQ = async (req, res) => {
    try {
        const validation = validateFAQData(req.body);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",validation.errors);
        }

        const faq = await FAQ.create(req.body);

        return responseHandler(res,StatusCodes.INSERTED,"FAQ created successfully",faq);
    } catch (error) {
        console.error("Create FAQ error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to create FAQ");
    }
};


const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ createdAt: -1 });

        return responseHandler(res,StatusCodes.SUCCESS,"FAQs fetched successfully",faqs);
    } catch (error) {
        console.error("Get FAQs error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to fetch FAQs");
    }
};

const getFAQById = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"FAQ not found");
        }

        return responseHandler(res,StatusCodes.SUCCESS,"FAQ fetched successfully",faq);
    } catch (error) {
        console.error("Get FAQ by ID error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid FAQ ID" );
    }
};


const updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"FAQ not found");
        }

        const mergedData = {
            question: req.body.question ?? faq.question,
            answer: req.body.answer ?? faq.answer,
            isActive: req.body.isActive ?? faq.isActive
        };

        const validation = validateFAQData(mergedData);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",validation.errors);
        }

        faq.question = mergedData.question;
        faq.answer = mergedData.answer;
        faq.isActive = mergedData.isActive;

        await faq.save();

        return responseHandler(res,StatusCodes.SUCCESS,"FAQ updated successfully",faq);
    } catch (error) {
        console.error("Update FAQ error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Failed to update FAQ");
    }
};


const deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"FAQ not found");
        }

        await FAQ.findByIdAndDelete(req.params.id);

        return responseHandler(res,StatusCodes.SUCCESS,"FAQ deleted successfully");
    } catch (error) {
        console.error("Delete FAQ error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid FAQ ID");
    }
};

module.exports = {createFAQ,getAllFAQs,getFAQById,updateFAQ,deleteFAQ}
