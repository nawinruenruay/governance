const express = require("express");
const cors = require("cors");
const complaint = require("./complaint");
const admin = require("./admin");

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(complaint);
app.use(admin);

app.use(express.static("public"));
app.use("/pdf", express.static("uploadpdf"));
app.use("/img", express.static("uploadimg"));

const port = 7777;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
