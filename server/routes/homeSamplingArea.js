const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createHomeSamplingArea,getHomeSamplingAreas,updateHomeSamplingArea,deactivateHomeSamplingArea} = require("../controllers/homeSamplingArea");


router.post("/newArea", protect, authorizeRoles("Admin"), createHomeSamplingArea);
router.put("/update/:id", protect, authorizeRoles("Admin"), updateHomeSamplingArea);
router.patch("/delete/:id/deactivate", protect, authorizeRoles("Admin"), deactivateHomeSamplingArea);
router.get("/getArea", getHomeSamplingAreas);

module.exports = router;