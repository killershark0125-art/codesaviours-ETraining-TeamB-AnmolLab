const rateLimit = require("express-rate-limit");
const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");

const chatbotRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    limit: 20,                
    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) => req.chatbotIdentity,

    handler: (req, res) => {
        return responseHandler(res,StatusCodes.TOO_MANY_REQUESTS,"You have reached the chatbot message limit. Please try again after one hour."
        );
    }
});

module.exports = chatbotRateLimiter;