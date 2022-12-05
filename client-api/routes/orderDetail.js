const express = require("express")
const router = express.Router()

const orderDetailController = require("../controllers/api/orderDetailController")
const auth = require("../middlewares/auth")

router.get("/:id", auth, orderDetailController.getOrderDetails)
router.post("/create", auth, orderDetailController.createOrderDetail)

module.exports = router;