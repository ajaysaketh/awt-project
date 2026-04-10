const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/classController");
const authMiddleware = require("../middleware/auth");

router.get("/",       authMiddleware, controller.getAll);
router.post("/",      authMiddleware, controller.create);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
