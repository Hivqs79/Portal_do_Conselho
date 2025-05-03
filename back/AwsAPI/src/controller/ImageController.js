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

const imageService = require("../service/ImageService");
const mime = require("mime-types");

class ImageController {
  addImage(req, res) {
    const { nome, id_user } = req.body;
    if (!nome || !id_user || !req.file) {
      res.status(400).json({ message: "Missing or invalid params" });
      return;
    }
    const image = Buffer.from(new Uint8Array(req.file.buffer));
    imageService
      .addImage(image, nome, id_user)
      .then((data) => {
        if (data == undefined) {
          res.status(404).json({ message: "Error to add image!" });
        }
        res.status(201).json({ message: "Image added successfully!" });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAllImages(req, res) {
    imageService
      .getAllImages()
      .then((data) => {
        console.log(data);
        res.status(200).json({ image: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getImageById(req, res) {
    try {
      const [data, file] = await imageService.getImageById(
        req.params["id_user"]
      );
      if (!file) {
        res.status(400).json({ message: "Image not found!" });
        return;
      }
      if (!data) {
        res.status(400).json({ message: "Image not registered!" });
        return;
      }

      const mimeType = "image/jpeg";
      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename=image.jpg`);
      res.send(file);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar imagem");
    }
  }
}

module.exports = new ImageController();
