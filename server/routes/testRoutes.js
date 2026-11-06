const express = require("express");
const router = express.Router();
const upload = require("../utils/upload")

const {createTest,getAllTests,getTestById,updateTest,deleteTest,importTestsFromCSV} = require("../controllers/test");

router.post("/newTest", createTest);
router.get("/getAllTests", getAllTests);
router.get("/getTestById/:id", getTestById);
router.put("/updateTest/:id", updateTest);
router.delete("/deleteTest/:id", deleteTest);
router.post("/importCSV", upload.single("file"), importTestsFromCSV);

module.exports = router;