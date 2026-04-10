const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/teacherController");
const authMiddleware = require("../middleware/auth");

router.get("/",           authMiddleware, controller.getAll);
router.post("/",          authMiddleware, controller.create);
router.put("/:id/status", authMiddleware, controller.updateStatus);
router.delete("/:id",     authMiddleware, controller.remove);

module.exports = router;
