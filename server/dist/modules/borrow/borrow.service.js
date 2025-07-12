"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummaryService = exports.borrowBookService = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const mongoose_1 = require("mongoose");
const borrowBookService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: bookId, quantity, dueDate } = payload;
    const objectBookId = new mongoose_1.Types.ObjectId(bookId);
    // 1. Check if book exists and enough copies available
    const book = yield book_model_1.Book.findById(objectBookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.copies < quantity) {
        throw new Error("Not enough copies available to borrow");
    }
    // 2. Deduct copies
    book.copies -= quantity;
    // 3. Save updated book copies
    yield book.save();
    // 4. Update availability with static method
    yield book_model_1.Book.updateAvailability(bookId);
    // 5. Create borrow record
    const borrowRecord = yield borrow_model_1.Borrow.create({
        book: objectBookId,
        quantity,
        dueDate,
    });
    return borrowRecord;
});
exports.borrowBookService = borrowBookService;
// Borrow aggregation summary
const getBorrowSummaryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $unwind: "$book",
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: "$book.title",
                    isbn: "$book.isbn",
                },
            },
        },
    ]);
    return summary;
});
exports.getBorrowSummaryService = getBorrowSummaryService;
