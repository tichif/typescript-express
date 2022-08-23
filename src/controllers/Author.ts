import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Author from '../models/Author';

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name,
    });

    const savedAuthor = await author.save();
    return res.status(201).json({ author: savedAuthor });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json({ author });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find({});
    return res.status(200).json({ authors });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    author.set(req.body);
    const updatedAuthor = await author.save();

    return res.status(200).json({ author: updatedAuthor });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    await author.remove();

    return res.status(200).json({ message: 'Author removed' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  createAuthor,
  readAllAuthors,
  readAuthor,
  updateAuthor,
  deleteAuthor,
};
