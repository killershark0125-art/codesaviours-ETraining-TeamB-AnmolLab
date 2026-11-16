const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


const {createSlot,getAvailableSlots} = require("../controllers/slot");



router.post("/create", protect, authorizeRoles("Admin"), createSlot);
router.get("/available", getAvailableSlots);

module.exports = router;