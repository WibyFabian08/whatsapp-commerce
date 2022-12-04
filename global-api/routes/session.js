const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/api/sessionController");

router.post("/create", sessionController.createSession);
router.get("/", sessionController.getSessions)
router.get("/find", sessionController.getSession)
router.get("/find/id/:id", sessionController.getSessionById)
router.get("/status", sessionController.getSessionsStatus)
router.delete("/delete", sessionController.deleteSession);

module.exports = router;
