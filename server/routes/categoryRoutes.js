const expreess = require("express");
const router = expreess.Router();


const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category");

router.post("/newCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryById/:id", getCategoryById);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);


module.exports = router;