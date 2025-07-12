# 📚 Library Management System

A **minimal Library Management API** built with **Express**, **TypeScript**, and **MongoDB (via Mongoose)** that allows users to manage books and borrow records effectively.

---

## ✨ Features

- ✅ Add, update, delete, and retrieve books
- 📚 Borrow books with quantity check and availability update
- 📊 View borrowed books summary using aggregation pipeline
- 🧠 Mongoose static method, instance method, and middleware used
- 🔍 Filtering and sorting of books
- 🧪 Schema validation and proper error handling

---

## ⚙️ Tech Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Mongoose Schema Validation
- **Deployment:** Vercel / Render / Railway _(based on your deployment)_

---

## 📁 Project Structure

📦 library-management-api
├── src
│ ├── app
│ │ ├── modules
│ │ │ ├── book
│ │ │ └── borrow
│ │ ├── middlewares
│ │ ├── utils
│ ├── config
│ ├── server.ts
├── package.json
├── tsconfig.json
└── README.md

yaml
Copy code

---

## 📌 API Endpoints

### ✅ Book Endpoints

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `/api/books`     | Create a new book                |
| GET    | `/api/books`     | Get all books (with filter/sort) |
| GET    | `/api/books/:id` | Get a single book by ID          |
| PUT    | `/api/books/:id` | Update a book                    |
| DELETE | `/api/books/:id` | Delete a book                    |

---

### ✅ Borrow Endpoints

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| POST   | `/api/borrow` | Borrow a book (with checks)      |
| GET    | `/api/borrow` | Borrow summary using aggregation |

---

## 🧪 Sample Book Fields

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root with:

env
Copy code
PORT=5000
DATABASE_URL=your_mongodb_connection_string
4. Run the Server
In development:
bash
Copy code
npm run dev
In production:
bash
Copy code
npm run build
npm start
🧠 Key Concepts Used
Mongoose Middleware (pre, post)

Instance/Static methods

Aggregation Pipeline ($group, $lookup)

DTO and Custom Error Handling

Filtering, Sorting, Pagination (optional)

🪲 Error Response Format
json
Copy code
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
📽 Video Explanation
📺 Click to watch
(Add your own video walkthrough link here)

🌐 Live Deployment
🔗 Live API Base URL
(Replace with your actual link from Vercel, Render, or Railway)

👨‍💻 Author
Name: Sahabul Islam Sifat

Email: sahabulislamsifat@gmail.com

```
