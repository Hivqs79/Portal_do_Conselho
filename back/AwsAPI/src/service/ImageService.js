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
