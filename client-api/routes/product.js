const express = require("express");
const router = express.Router();

const productController = require("../controllers/api/productController");
const auth = require("../middlewares/auth");

router.post("/create", auth, productController.createProduct);
router.get("/", auth, productController.getProducts);
router.get("/find/:id", auth, productController.getProduct);
router.get("/collections", auth, productController.getCollections);
router.put("/update/:id", auth, productController.updateProduct);
router.delete("/delete/:id", auth, productController.deleteProduct);

module.exports = router;
