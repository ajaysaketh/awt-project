const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/notificationController");
const authMiddleware = require("../middleware/auth");

router.get("/",          authMiddleware, controller.getAll);
router.put("/read-all",  authMiddleware, controller.markAllRead);
router.put("/:id/read",  authMiddleware, controller.markRead);
router.delete("/",       authMiddleware, controller.clearAll);
router.delete("/:id",    authMiddleware, controller.remove);

module.exports = router;
