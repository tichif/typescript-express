import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Book from '../models/Book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author } = req.body;

    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      title,
      author,
    });

    const savedBook = await book.save();
    return res.status(201).json({ book: savedBook });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.set(req.body);
    const updatedBook = await book.save();

    return res.status(200).json({ book: updatedBook });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.remove();

    return res.status(200).json({ message: 'Book removed' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  createBook,
  readAllBooks,
  readBook,
  updateBook,
  deleteBook,
};
