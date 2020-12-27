require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const logRoute = require("./routes/log");

const app = express();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connected to DB"));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json());
app.use("/api", logRoute);
