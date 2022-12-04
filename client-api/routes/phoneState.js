const express = require("express")
const router = express.Router()

const phoneStateController = require("../controllers/api/phoneStateController")

router.get("/:phone", phoneStateController.getPhoneState);
router.post("/create", phoneStateController.create);
router.put("/update/:phone", phoneStateController.update);

module.exports = router