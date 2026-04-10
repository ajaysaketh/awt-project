const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/studentController");
const authMiddleware = require("../middleware/auth");

router.get("/",       authMiddleware, controller.getAll);
router.get("/:id",    authMiddleware, controller.getOne);
router.post("/",      authMiddleware, controller.create);
router.put("/:id",    authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
