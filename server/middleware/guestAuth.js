const jwt = require("jsonwebtoken");
const User = require("../models/user");
const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");

const guestAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        if (!authHeader.startsWith("Bearer ")) {
            return responseHandler(res,StatusCodes.UNAUTHORIZED,"Invalid authorization format");
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured");
            return responseHandler(res,StatusCodes.SERVER_ERROR,"Authentication configuration error");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return responseHandler(res,StatusCodes.UNAUTHORIZED,"User no longer exists");
        }

        if (!user.isActive) {
            return responseHandler(res,StatusCodes.FORBIDDEN,"Account is inactive"
            );
        }

        req.user = user;
        next();

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return responseHandler(res,StatusCodes.UNAUTHORIZED,"Invalid or expired token"
            );
        }

        console.error("Optional authentication error:", error.message);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Authentication failed"
        );
    }
};

module.exports = guestAuth;