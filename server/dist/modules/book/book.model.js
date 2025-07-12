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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const borrow_model_1 = require("../borrow/borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Book title is required."],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name is required."],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Image name is required."],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre.",
        },
        required: [true, "Book genre is required."],
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required."],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required."],
        min: [0, "Number of copies cannot be negative."],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
// deleteMany ,deleteOne
bookSchema.post(["findOneAndDelete", "deleteMany", "deleteOne"], function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
    });
});
// book.model.ts (Add this static method inside bookSchema)
bookSchema.statics.updateAvailability = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        book.available = book.copies > 0;
        yield book.save();
    });
};
exports.Book = (0, mongoose_2.model)("Book", bookSchema, "books");
