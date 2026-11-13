const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {createTest,getAllTests,getTestById,updateTest,deleteTest,importTestsFromCSV} = require("../controllers/test");

router.post("/newTest", createTest,protect,authorizeRoles("Admin"));
router.get("/getAllTests", getAllTests);
router.get("/getTestById/:id", getTestById);
router.put("/updateTest/:id", updateTest,protect,authorizeRoles("Admin"));
router.delete("/deleteTest/:id", deleteTest,protect,authorizeRoles("Admin"));
router.post("/importCSV",protect,authorizeRoles("Admin"), upload.single("file"), importTestsFromCSV);

module.exports = router;