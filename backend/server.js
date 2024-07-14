require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { userRouter } = require("./routes");
const dbConfig = require("./config/dbConfig");
const cloudinaryConfig = require("./config/cloudinaryConfig");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
cloudinaryConfig();

app.use("/api", userRouter);

app.get("*", (req, res) => {
  res.send("PennyCalc API");
});

dbConfig(app);
