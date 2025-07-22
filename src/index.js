const express = require("express");
const cors = require("cors");

const facesRouter = require("./controllers/faces-controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faces", facesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
