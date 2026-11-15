const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


const {createPackage,getAllPackages,getPackageById,updatePackage,deletePackage} = require("../controllers/package");


router.post("/newPackage", protect, authorizeRoles("Admin"),createPackage);
router.get("/getAllPackages", getAllPackages);
router.get("/getPackageById/:id", getPackageById);
router.put("/updatePackage/:id",protect, authorizeRoles("Admin"), updatePackage);
router.delete("/deletePackage/:id", protect, authorizeRoles("Admin"),deletePackage);


module.exports = router;