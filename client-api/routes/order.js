const express = require("express")
const router = express.Router()

const orderController = require("../controllers/api/orderController")
const checkSessionName = require("../middlewares/sessionName")
const auth = require("../middlewares/auth")

router.get("/", auth, orderController.getOrder)
router.post("/create", auth, orderController.createOrder )

module.exports = router;