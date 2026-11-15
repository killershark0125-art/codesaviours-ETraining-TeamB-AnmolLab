const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createFAQ,getAllFAQs,getFAQById,updateFAQ,deleteFAQ} = require("../controllers/faq");


router.post("/newFAQ",protect, authorizeRoles("Admin"),  createFAQ);
router.get("/getAllFAQs", getAllFAQs);
router.get("/getFAQById/:id", getFAQById);
router.put("/updateFAQ/:id",protect, authorizeRoles("Admin"),  updateFAQ);
router.delete("/deleteFAQ/:id",protect, authorizeRoles("Admin"),  deleteFAQ);

module.exports = router;