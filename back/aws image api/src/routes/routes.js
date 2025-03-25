const express = require("express");
const router = express.Router();
const ImageController = require("../controller/ImageController");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/image", ImageController.getAllImages);
router.get("/image/:id_user", ImageController.getImageById);
router.post("/image", upload.single('image'), ImageController.addImage);


module.exports = router;