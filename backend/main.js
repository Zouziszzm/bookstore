import express from "express";
import { conStream } from "./statics.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(234).send("Check the code Please.");
});

app.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishyear
    ) {
      res.send({ message: "Send all data please. title, author, description, publishyear," })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
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
