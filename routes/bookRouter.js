const express = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/", bookController.addBook);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
