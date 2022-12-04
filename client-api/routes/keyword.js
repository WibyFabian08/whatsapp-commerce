const express = require("express");
const router = express.Router();

const keywordController = require("../controllers/api/keywordController");
const auth = require("../middlewares/auth");

router.get("/:keyword", auth, keywordController.getKeyword);
router.post("/create/text", auth, keywordController.create);
router.post("/create/button-image", auth, keywordController.create);
router.post("/create/button", auth, keywordController.create);
router.post("/create/list", auth, keywordController.create);
router.post("/create/image", auth, keywordController.create);
router.delete("/delete/:id", auth, keywordController.delete);

module.exports = router;
