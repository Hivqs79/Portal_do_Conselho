const express = require("express");
const cors = require("cors");
const router = require("./src/routes/routes");


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(3060,() => {
    console.log("O servidor está rodando na porta 3060");
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});