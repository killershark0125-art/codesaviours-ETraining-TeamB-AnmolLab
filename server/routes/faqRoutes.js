const express = require("express");
const router = express.Router();


const {createFAQ,getAllFAQs,getFAQById,updateFAQ,deleteFAQ} = require("../controllers/faq");


router.post("/newFAQ", createFAQ);
router.get("/getAllFAQs", getAllFAQs);
router.get("/getFAQById/:id", getFAQById);
router.put("/updateFAQ/:id", updateFAQ);
router.delete("/deleteFAQ/:id", deleteFAQ);

module.exports = router;