const express = require("express")
const router = express()

const mainController = require("../controllers/mainController")

router.post("/", mainController.initMessage)

module.exports = router