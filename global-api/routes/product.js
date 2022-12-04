const express = require("express");
const router = express.Router();

const productController = require("../controllers/api/productController");
const checkSessionName = require("../middlewares/sessionName");

router.post("/create", checkSessionName, productController.createProduct);
router.get("/", checkSessionName, productController.getProducts);
router.get("/find", checkSessionName, productController.getProduct);
router.get("/collections", checkSessionName, productController.getCollections);
router.put("/update/:id", checkSessionName, productController.updateProduct);
router.delete("/delete/:id", checkSessionName, productController.deleteProduct);

module.exports = router;
