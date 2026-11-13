const crypto = require("crypto");

const chatbotSession = (req, res, next) => {
    if (req.user) {
        req.chatbotIdentity = `user:${req.user._id}`;
        return next();
    }

    let sessionId = req.cookies?.chatbotSessionId;

    if (!sessionId) {
        sessionId = crypto.randomUUID();

        res.cookie("chatbotSessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
    }

    req.chatbotIdentity = `guest:${sessionId}`;

    next();
};

module.exports = chatbotSession;