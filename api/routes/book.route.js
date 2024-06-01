import express from "express";
import {
  createBook,
  fetchBooks,
  deleteBook,
  updateBook,
  getBook,
  getBooksByAuthor,
  getBooksByCategory,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", createBook);
router.get("/get", fetchBooks);
router.delete("/delete/:id", deleteBook);
router.post("/update/:id", updateBook);
router.get("/fetch/:id", getBook);
router.get("/author/:name", getBooksByAuthor);
router.get("/category/:name", getBooksByCategory);

export default router;
