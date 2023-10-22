import express from "express";
import { conStream } from "./statics.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(234).send("Check the code Please.");
});

mongoose
  .connect(conStream)
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`server live and connected @ http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
