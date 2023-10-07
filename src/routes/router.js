const express = require("express");
const router = express.Router();
const sendJson = require("../controller/sendJson");

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/getjson", sendJson);

module.exports = router;
