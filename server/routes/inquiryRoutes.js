const express = require("express");
const router = express.Router();


const {submitInquiry,getAllInquiries,getInquiryById,updateInquiry,deleteInquiry} = require("../controllers/inquiry");


router.post("/submit", submitInquiry);
router.get("/getAllInquiries", getAllInquiries);
router.get("/getInquiryById/:id", getInquiryById);
router.put("/updateInquiry/:id", updateInquiry);
router.delete("/deleteInquiry/:id", deleteInquiry);

module.exports = router;