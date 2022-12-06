const express = require("express")
const router = express.Router()

const packageController = require("../controllers/api/packageController")

router.post("/create", packageController.create)
router.get("/find/:id", packageController.getById)

module.exports = router