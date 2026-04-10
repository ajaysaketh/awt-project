const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/auth");

router.get("/",            authMiddleware, controller.getAll);
router.post("/mark",       authMiddleware, controller.mark);
router.get("/report",      authMiddleware, controller.report);
router.get("/student/:id", authMiddleware, controller.studentReport);

module.exports = router;
