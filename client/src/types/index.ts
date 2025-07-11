export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  image?: string;
}

export interface IBorrow {
  _id?: string;
  bookId: string;
  quantity: number;
  dueDate: string; // ISO format date
}

export interface IBorrowSummary {
  _id: string;
  totalQuantity: number;
  book?: {
    title?: string;
    isbn?: string;
    // add other book properties if needed
  };
}

export interface EditBookFormData {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
}
