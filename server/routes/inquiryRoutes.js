const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {submitInquiry,getAllInquiries,getInquiryById,updateInquiry,deleteInquiry} = require("../controllers/inquiry");


router.post("/submit", submitInquiry);
router.get("/getAllInquiries",protect,authorizeRoles("Admin"),getAllInquiries);
router.get("/getInquiryById/:id",protect,authorizeRoles("Admin"), getInquiryById);
router.put("/updateInquiry/:id",protect,authorizeRoles("Admin"), updateInquiry);
router.delete("/deleteInquiry/:id",protect,authorizeRoles("Admin"), deleteInquiry);

module.exports = router;