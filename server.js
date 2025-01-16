const express = require("express");
const app = express();

// //cors to fix cors origin, body-parser to fix the post value on the server
// const cors = require("cors");
const bodyParser = require("body-parser");
// app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
