const db = require("./db");

const selectAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM plantas", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


module.exports = { selectAll };
