import { Book } from "./book.model";

export const createBookService = async (payload: any) => {
  const newBook = await Book.create(payload);
  return newBook;
};

interface IQueryOptions {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export const getAllBooksService = async (options: IQueryOptions) => {
  const {
    filter,
    sortBy = "createdAt",
    sort = "desc",
    limit = 8,
    page = 1,
  } = options;

  const query: any = {};
  if (filter) {
    query.genre = filter;
  }

  const sortOption: any = {};
  sortOption[sortBy] = sort === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const books = await Book.find(query).sort(sortOption).skip(skip).limit(limit);

  const total = await Book.countDocuments(query);

  return {
    data: books,
    total,
    page,
    limit,
  };
};

export const getBookByIdService = async (id: string) => {
  const book = await Book.findById(id);
  return book;
};

export const updateBookService = async (id: string, payload: any) => {
  const book = await Book.findByIdAndUpdate(id, payload, { new: true });
  return book;
};

export const deleteBookService = async (id: string) => {
  await Book.findByIdAndDelete(id);
};
