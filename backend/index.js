import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to my MERN stack project");
});

app.use("/books", booksRoute);

//Listening to port
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

try {
  mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database");
  });
} catch (error) {
  console.log(error);
}
