const express = require('express');
const cors = require('cors');

const db = require("./database/database");
const routes = require("./routes/routes");


const app = express();



//conectar ao banco de dados
db.connect();

//habilita cors
app.use(cors())

//habilita server para receber dados no formato json
app.use(express.json())


//rotas
app.use("/api", routes);

// server execute
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));