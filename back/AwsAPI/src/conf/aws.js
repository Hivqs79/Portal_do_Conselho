const AWS = require("aws-sdk");

// Configuração das credenciais AWS
AWS.config.update({
  region: process.env.REGION.trim(),
  accessKeyId: process.env.ACCESS_KEY_ID.trim(),
  secretAccessKey: process.env.SECRET_ACCESS_KEY.trim()
});

// Criação da instância do S3
const s3 = new AWS.S3();

module.exports = s3;
