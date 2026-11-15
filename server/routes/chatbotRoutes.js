const express = require("express");
const router = express.Router();

const { sendChatMessage } = require("../controllers/chatbot");
const guestAuth = require("../middleware/guestAuth");
const chatbotSession = require("../middleware/chatbotSession");
const chatbotRateLimiter = require("../utils/chatbotRateLimiter");

router.post("/message",guestAuth,chatbotSession,chatbotRateLimiter,sendChatMessage);

module.exports = router;