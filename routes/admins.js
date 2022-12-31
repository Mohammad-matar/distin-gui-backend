const express = require("express");
const controller = require("../Controllers/adminControllers");
const { authenticated } = require("../middlewares/auth");
const router = express.Router();


//Create Routes
router.get("/", controller.getAll);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", authenticated, controller.delete);

module.exports = router;