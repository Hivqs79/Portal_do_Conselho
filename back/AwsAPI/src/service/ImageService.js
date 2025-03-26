const imageRepository = require("../repository/ImageRepository");
const fs = require('fs');
const s3 = require("../conf/aws");

function downloadFile(bucketName, keyName, downloadPath) {
    const params = {
        Bucket: bucketName,
        Key: keyName
    };

    return new Promise((resolve, reject) => {
        const fileStream = s3.getObject(params).createReadStream();
  
        let data = [];
        fileStream.on('data', (chunk) => data.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(data)));
        fileStream.on('error', (err) => reject(err));
      });
};

function uploadFile(file, bucketName, keyName) {

    const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Erro ao fazer o upload:', err);
      } else {
        console.log('Arquivo carregado com sucesso:', data.Location);
      }
    });
  };

class ImageService {
    addImage(image, titulo, idUser) {
        const data_criacao = new Date();
        const uuid = crypto.randomUUID();
        uploadFile(image, "portal-conselho-bucket", uuid);
        return imageRepository.addImage(uuid, titulo, idUser, data_criacao);
    };
    
    getAllImage() {
        return imageRepository.getAllImage();
    };

    async getImageById(idUserImage) {
        try {
            let data = await imageRepository.getImageById(idUserImage);
            const file = await downloadFile("portal-conselho-bucket", data[0].referencia, `./imageOutput/${data[0].titulo}.jpg`);
            return [data, file];                            
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new ImageService();