import express from "express";
import { conStream } from "./statics.js";
import mongoose from "mongoose";
import Book from "./models/BookModel.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("Check the code Please.");
});

app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishyear
    ) {
      res.send({ message: "Send all data please. title, author, description, publishyear," })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publishyear: req.body.publishyear
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
});

//get book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id)
    return res.status(200).json({
      count: books.length,
      data: books
    })
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})


//get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({})
    return res.status(200).json({
      count: books.length,
      data: books
    })
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})


//update a book 
app.put('/books/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishyear
    ) {
      res.status(400).send({ message: "please enter all the fields" })
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body)
    if (!result) {
      res.status(404).send({ message: "book not found" })
    }
    res.status(200).send({ message: 'book updated successfully' })
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

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
