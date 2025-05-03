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
