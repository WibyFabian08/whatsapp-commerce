const express = require("express")
const router = express.Router()

const orderController = require("../controllers/api/orderController")
const checkSessionName = require("../middlewares/sessionName")

router.get("/", checkSessionName, orderController.getOrder)

module.exports = router;