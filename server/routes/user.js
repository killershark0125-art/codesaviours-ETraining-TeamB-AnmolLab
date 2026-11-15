const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const responseHandler = require("../utils/responseHandler");

const {registerUser,loginUser,getCurrentUser} = require("../controllers/user");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/admin",protect,authorizeRoles("Admin"),(req, res) => 
    {   
         return responseHandler(res,200,"Admin access granted");
    }
);
module.exports = router;