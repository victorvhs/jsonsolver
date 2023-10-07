const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(require("./routes/router"));

const port = 3666;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
