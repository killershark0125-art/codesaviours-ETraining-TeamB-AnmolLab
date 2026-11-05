const express = require("express");
const router = express.Router();


const {createPackage,getAllPackages,getPackageById,updatePackage,deletePackage} = require("../controllers/package");


router.post("/newPackage", createPackage);
router.get("/getAllPackages", getAllPackages);
router.get("/getPackageById/:id", getPackageById);
router.put("/updatePackage/:id", updatePackage);
router.delete("/deletePackage/:id", deletePackage);


module.exports = router;