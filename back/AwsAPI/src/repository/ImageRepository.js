const knex = require("../database/connection");

class ImageRepository {
  addImage(referencia, nome, id_user, data_criacao) {
    return database
      .insert({ referencia, nome, id_user, data_criacao })
      .table("Image");
  }

  getAllImage() {
    return database.select("*").table("Image");
  }

  getImageById(idUserImage) {
    return database.select("*").from("Image").where("id_user", idUserImage);
  }
}

module.exports = new ImageRepository();
