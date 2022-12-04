const express = require("express")
const router = express.Router()

const productCategoryController = require("../controllers/api/productCategoryController")
const auth = require("../middlewares/auth")

router.get("/", auth, productCategoryController.getAll)
router.get("/find/:id", auth, productCategoryController.getById)
router.post("/", auth, productCategoryController.create)
router.put("/update/:id", auth, productCategoryController.update)
router.delete("/delete/:id", auth, productCategoryController.delete)

module.exports = router;