const express = require("express");
const controller = require("../Controllers/authControllers");
const router = express.Router();


//Create Routes
router.post("/login", controller.login);


module.exports = router;