import { Book } from "../models/book.model.js";

export const createBook = async (req, res, next) => {
  try {
    const new_book = new Book(req.body);
    await new_book.save();

    res.json({
      success: true,
      message: "Your Book Has Been Registered Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.json({ success: true, message: books });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    const other_books = await Book.find();

    res.json({
      success: true,
      message: "Your Book has Been Deleted Successfuly",
      books: other_books,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ success: true, message: "Book Has Been Updated Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({ success: true, message: book });
  } catch (error) {
    next(error);
  }
};

export const getBooksByAuthor = async (req, res, next) => {
  try {
    const book = await Book.find({ author: req.params.name });
    res.json({ success: true, message: book });
  } catch (error) {
    next(error);
  }
};

export const getBooksByCategory = async (req, res, next) => {
  try {
    const book = await Book.find({ category: req.params.name });
    res.json({ success: true, message: book });
  } catch (error) {
    next(error);
  }
};
