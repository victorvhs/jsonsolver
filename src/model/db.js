const sqlite3 = require("sqlite3").verbose();
const dataBase = "./src/model/sqlite.db";
const uuid = require("uuid");
const fs = require("fs");

const createDbConnection = () => {
  if (fs.existsSync(dataBase)) {
    console.log("Database found, connecting to database");
    return new sqlite3.Database(dataBase);
  } else {
    console.log("Database not found, creating new database");
    const db = new sqlite3.Database(dataBase, (err) => {
      if (err) console.error(err.message);
      createTable(db);
      insertRow(db);
      console.log("Connected to the database.");
    });

    return db;
  }
};

const createTable = (db) => {
  db.exec(`
		CREATE TABLE IF NOT EXISTS plantas (
			id TEXT PRIMARY KEY NOT NULL UNIQUE,
    	nome_da_planta VARCHAR(255) NOT NULL,
    	total_de_vendas INT,
    	usuario_que_vendeu VARCHAR(255) NOT NULL,
    	dia_da_venda DATE NOT NULL,
    	venda_aprovada BOOLEAN NOT NULL
		);
	`);
};

const insertRow = (db) => {
  console.log("Inserting sample data into database");

  const stmt = db.prepare(`
    INSERT INTO plantas (id, nome_da_planta, total_de_vendas, usuario_que_vendeu, dia_da_venda, venda_aprovada)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const plantNames = [
    "Rosa",
    "Lírio",
    "Orquídea",
    "Girassol",
    "Tulipa",
    "Margarida",
    "Cravo",
    "Violeta",
    "Azaleia",
    "Hortênsia",
    "Lavanda",
    "Camélia",
    "Gengibre",
    "Dália",
    "Peônia",
    "Gérbera",
    "Jasmim",
    "Hibisco",
    "Begônia",
    "Cróton",
    "Samambaia",
    "Suculenta",
    "Orégano",
    "Manjericão",
    "Alecrim",
    "Cacto",
    "Bambu",
    "Papoula",
    "Dente-de-leão",
    "Lótus",
    "Crisântemo",
    "Tulipa",
    "Rosmaninho",
    "Giesta",
    "Gerânio",
    "Narciso",
    "Crisântemo",
    "Mate",
    "Rosmaninho",
    "Giesta",
    "Gerânio",
    "Narciso",
    "Hibisco",
    "Begônia",
    "Cróton",
  ];

  for (let i = 0; i < plantNames.length; i++) {
    stmt.run(
      generateUUID(),
      plantNames[i],
      Math.round(Math.random() * 100),
      `Usuário${(i % 5) + 1}`,
      `2023-10-${(i + 1).toString().padStart(2, "0")}`,
      1
    );
  }

  stmt.finalize();

  console.log("Sample data inserted into database");
};

function generateUUID() {
  return uuid.v4().replace(/-/g, ""); // Remove hífens
}
module.exports = createDbConnection();
