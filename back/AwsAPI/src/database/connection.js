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

const knex = require("knex");

const dbWithoutDatabase = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

let db;

async function createDatabaseAndTables() {
  try {
    // Criação do banco de dados
    await dbWithoutDatabase.raw(
      "CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME + ";"
    );
    console.log(`Database ${process.env.DB_NAME} criada com sucesso`);

    // Inicializar o `db` com a base de dados correta
    db = knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    });

    const imagensExists = await db.schema.hasTable("tb_awsimagem");
    if (!imagensExists) {
      await db.schema.createTable("tb_awsimagem", (table) => {
        table.increments("id").primary();
        table.string("referencia", 255);
        table.string("nome", 255);
        table.integer("id_user").unsigned();
        table.timestamp("data_criacao").defaultTo(db.fn.now());
      });
      console.log("Tabela 'tb_awsimagem' criada com sucesso");
    }
  } catch (err) {
    console.error("Erro ao criar o banco de dados ou tabelas: " + err.message);
  } finally {
    // Fechar a conexão inicial
    dbWithoutDatabase.destroy();
  }
}

module.exports = {
  createDatabaseAndTables,
  getDb: () => db, // Função para acessar o `db` após a inicialização
};
