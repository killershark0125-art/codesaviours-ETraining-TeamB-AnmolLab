const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode")

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
         if (!req.user) {
            return responseHandler(res, StatusCodes.UNAUTHORIZED, "Authentication required");
        }
        if (!allowedRoles.includes(req.user.role)) {
            return responseHandler(res, StatusCodes.FORBIDDEN, "You do not have permission to access this resource");
        }
          next();
    }
}

module.exports = authorizeRoles;