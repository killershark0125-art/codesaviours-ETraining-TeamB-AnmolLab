const expreess = require("express");
const router = expreess.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category");

router.post("/newCategory",protect, authorizeRoles("Admin"), createCategory);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryById/:id", getCategoryById);
router.put("/updateCategory/:id",protect, authorizeRoles("Admin"), updateCategory);
router.delete("/deleteCategory/:id",protect, authorizeRoles("Admin"), deleteCategory);


module.exports = router;