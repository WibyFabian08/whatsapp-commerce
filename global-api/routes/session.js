const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/api/sessionController");
const checkSessionName = require("../middlewares/sessionName");

router.post("/create", sessionController.createSession);
router.get("/", checkSessionName, sessionController.getSessions);
router.get(
  "/find/phone/:phone",
  checkSessionName,
  sessionController.getSession
);
router.get("/find/id/:id", checkSessionName, sessionController.getSessionById);
router.get("/status", checkSessionName, sessionController.getSessionsStatus);
router.post(
  "/disconnect",
  checkSessionName,
  sessionController.disConnectSession
);
router.delete("/delete", checkSessionName, sessionController.deleteSession);

module.exports = router;
