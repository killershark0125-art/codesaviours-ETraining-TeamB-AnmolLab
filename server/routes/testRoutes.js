const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createTest,getAllTests,getTestById,getTestBySlug,updateTest,deleteTest,importTestsFromCSV} = require("../controllers/test");

router.post("/newTest",protect,authorizeRoles("Admin"), createTest);
router.get("/getAllTests", getAllTests);
router.get("/getTestById/:id", getTestById);
router.get("/slug/:slug", getTestBySlug);
router.put("/updateTest/:id",protect,authorizeRoles("Admin"), updateTest);
router.delete("/deleteTest/:id",protect,authorizeRoles("Admin"), deleteTest);
router.post("/importCSV",protect,authorizeRoles("Admin"), upload.single("file"), importTestsFromCSV);

module.exports = router;