const { getDb } = require("../database/connection");

class ImageRepository {
  addImage(referencia, nome, id_user, data_criacao) {
    const db = getDb();
    return db
      .insert({ referencia, nome, id_user, data_criacao })
      .table("tb_awsimagem");
  }

  getAllImage() {
    const db = getDb();
    return db.select("*").table("tb_awsimagem");
  }

  getImageById(idUserImage) {
    const db = getDb();
    return db.select("*").from("tb_awsimagem").where("id_user", idUserImage);
  }
}

module.exports = new ImageRepository();
