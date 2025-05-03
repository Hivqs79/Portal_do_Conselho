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