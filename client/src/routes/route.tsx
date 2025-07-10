import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllBook from "../pages/AllBook";
import BookDetails from "../components/book/BookDetails";
import AddBook from "../pages/AddBook";
import BorrowSummary from "../pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: AllBook,
      },
      {
        path: "book/:id",
        Component: BookDetails,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
