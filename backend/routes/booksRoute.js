import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for save a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for get all books from database

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Route for get one book by its ID from database

router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const books = await Book.findById(_id);
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Route for update a book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const _id = req.params.id;

    const result = await Book.findByIdAndUpdate(_id, req.body);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
});

//Route for delete a book

router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const result = await Book.findByIdAndDelete(_id);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

export default router;
