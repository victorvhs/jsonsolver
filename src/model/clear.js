const fs = require("fs");

const clear = () => {
  console.log("Apagando banco de dados e limpando diretório");
  fs.unlinkSync("./src/model/sqlite.db");
};
module.exports = clear();
