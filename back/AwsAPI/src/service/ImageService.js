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

const imageRepository = require("../repository/ImageRepository");
const s3 = require("../conf/aws");
const crypto = require("crypto");

function downloadFile(bucketName, keyName, downloadPath) {
  const params = {
    Bucket: bucketName,
    Key: keyName,
  };

  return new Promise((resolve, reject) => {
    const fileStream = s3.getObject(params).createReadStream();

    let data = [];
    fileStream.on("data", (chunk) => data.push(chunk));
    fileStream.on("end", () => resolve(Buffer.concat(data)));
    fileStream.on("error", (err) => reject(err));
  });
}

async function uploadFile(file, bucketName, keyName) {
  const params = {
    Bucket: bucketName,
    Key: keyName,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Erro ao fazer o upload:", err);
        reject(err);
      } else {
        console.log("Arquivo carregado com sucesso:", data.Location);
        resolve(data.Location);
      }
    });
  });
}

class ImageService {
  async addImage(image, nome, idUser) {
    const data_criacao = new Date();
    data_criacao.setHours(data_criacao.getHours() - 3);
    const uuid = crypto.randomUUID();
    const arrayImages = imageRepository.getAllImage();

    for (let i = 0; i < arrayImages.length; i++) {
      if (arrayImages[i].id_user == idUser) {
        throw new Error("This user already has an image");
      }
    }

    await uploadFile(image, "bucket-portal-conselho", uuid)
      .then(() => {
        return imageRepository.addImage(uuid, nome, idUser, data_criacao);
      })
      .catch((error) => {
        console.error("Não foi");
      });
  }

  getAllImage() {
    return imageRepository.getAllImage();
  }

  async getImageById(idUserImage) {
    try {
      let data = await imageRepository.getImageById(idUserImage);
      console.log("data test: ", data);
      console.log("data test two: " + data);
      console.log("data test two: " + data[0].referencia, data[0].nome);
      const file = await downloadFile(
        "bucket-portal-conselho",
        data[0].referencia,
        `./imageOutput/${data[0].nome}.jpg`
      );
      return [data, file];
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new ImageService();
