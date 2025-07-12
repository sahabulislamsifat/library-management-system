import { Request, Response } from "express";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "./book.service";
import { Book } from "./book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = await createBookService(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "8",
      page = "1",
    } = req.query;

    const data = await getAllBooksService({
      filter: filter as string,
      sortBy: sortBy as string,
      sort: sort as "asc" | "desc",
      limit: Number(limit),
      page: Number(page),
    });

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error,
    });
  }
};

export const getHighestCopiesBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ copies: -1 }).limit(8);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Highest Books Copies retrieved failed",
      success: false,
      error,
    });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await getBookByIdService(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Book not found",
      error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await updateBookService(bookId, req.body);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await deleteBookService(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
};
