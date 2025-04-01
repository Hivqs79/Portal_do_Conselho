const express = require("express");
const cors = require("cors");
const router = require("./src/routes/routes");
const { createDatabaseAndTables } = require("./src/database/connection");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

async function startServer() {
    try {
        await createDatabaseAndTables();
        app.listen(3060, () => {
            console.log("O servidor está rodando na porta 3060");
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

startServer();