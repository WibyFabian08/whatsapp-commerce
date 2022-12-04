const express = require("express")
const router = express.Router()

const checkSessionName = require("../middlewares/sessionName")
const keywordController = require("../controllers/api/keywordController")

router.post("/create/text", checkSessionName, keywordController.create)
router.post("/create/button-image", checkSessionName, keywordController.create)
router.post("/create/button", checkSessionName, keywordController.create)
router.post("/create/list", checkSessionName, keywordController.create)
router.post("/create/image", checkSessionName, keywordController.create)
router.delete("/delete/:id", checkSessionName, keywordController.delete)

module.exports = router