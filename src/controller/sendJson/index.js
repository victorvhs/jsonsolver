const { selectAll } = require("../../model/listData");

const sendJson = async (req, res) => {
  const data = await selectAll();
  res.send(JSON.stringify(data));
};

module.exports = sendJson;
