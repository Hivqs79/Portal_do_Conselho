/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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