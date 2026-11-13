const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createBranch,getAllBranches,getBranchById,updateBranch,deleteBranch} = require("../controllers/branch");

router.post("/newBranch",protect, authorizeRoles("Admin"), createBranch);
router.get("/getAllBranches", getAllBranches);
router.get("/getBranchById/:id", getBranchById);
router.put("/updateBranch/:id",protect, authorizeRoles("Admin"), updateBranch);
router.delete("/deleteBranch/:id",protect, authorizeRoles("Admin"), deleteBranch);


module.exports = router;