
const {getChatbotKnowledge} = require("../services/chatbotService");
const responseHandler = require("../utils/responseHandler");
const { StatusCodes } =  require("../consts/statusCode")
const {generateChatbotResponse,MEDICAL_DISCLAIMER} = require("../services/groqService");


const extractSearchTerm = (message) => {
    const cleanedMessage = message
        .replace(/[?!.,]/g, " ")
        .replace(
            /\b(what|which|how|much|is|are|the|a|an|for|of|to|do|does|can|i|need|preparation|required|price|cost|timing|report|time|test|please|tell|me|about)\b/gi,
            " "
        )
        .replace(/\s+/g, " ")
        .trim();

    return cleanedMessage;
};

const sendChatMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return responseHandler( res,StatusCodes.BAD_REQUEST, "Please provide a valid message.", MEDICAL_DISCLAIMER);
        }
        if (message.length > 1000) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Message cannot exceed 1000 characters.", MEDICAL_DISCLAIMER);
        }
        const searchTerm = extractSearchTerm(message);
        const knowledge = await getChatbotKnowledge(searchTerm);

        const result = await generateChatbotResponse(
            message,
            knowledge
        );

        return responseHandler( res,StatusCodes.SUCCESS, "Chatbot response generated successfully.",
             {
                answer: result.answer,
                disclaimer: result.disclaimer
            },
        );

    } catch (error) {
        console.error("Chatbot controller error:", error.message);

        return responseHandler( res,StatusCodes.SERVER_ERROR, "Unable to process your message right now. Please try again.", MEDICAL_DISCLAIMER);
    }
};

module.exports = {sendChatMessage};
