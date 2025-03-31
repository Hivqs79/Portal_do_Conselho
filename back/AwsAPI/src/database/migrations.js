const db = require("../database/connection");

async function createDatabaseAndTables() {
  try {
    await db.raw(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} criada com sucesso`);

    const imagensExists = await db.schema.hasTable("tb_awsimagem");
    if (!imagensExists) {
      await db.schema.createTable("tb_awsimagem", (table) => {
        table.increments("id").primary();
        table.string("referencia", 255);
        table.string("titulo", 255);
        table.integer("id_user").unsigned();
        table.timestamp("data_criacao").defaultTo(db.fn.now());
      });
      console.log("Tabela 'tb_awsimagem' criada com sucesso");
    }
  } catch (err) {
    console.error("Erro ao criar o banco de dados ou tabelas: " + err.message);
  } finally {
    db.destroy();
  }
}

module.exports = { createDatabaseAndTables };