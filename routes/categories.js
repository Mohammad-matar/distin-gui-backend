const express = require("express");
const multer = require("multer");
const controller = require("../Controllers/categoriesController");
const router = express.Router();

const path = "public/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

//Create Routes
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", upload.single("icon"), controller.post);
router.put("/:id", upload.single("icon"), controller.put);
router.delete("/:id", controller.delete);

module.exports = router;