const mongoose = require("mongoose"); //lib para se conectar ao mongoDB

function connect() {

    mongoose.connect(
        "mongodb://localhost:27017/api-restfull?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
      );
      
      const db = mongoose.connection;
      
      db.once("open", () => {
        console.log("Conectado ao banco de dados MONGODB");
      });
      
      db.on("error", console.error.bind("Erro de conexão"));
}

module.exports = {
  connect
}