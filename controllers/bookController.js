const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result) return res.status(400).json({ err: "ERROR" });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

const addBook = async (req, res) => {
  try {
    const { author, title, description, rating, nbVoters, img } = req.body;
    if (!author || !title || !description)
      return res
        .status(400)
        .json({ msg: "INFROMATION MISSING, PLEASE CHECK YOUR REQUEST !" });
    const newBook = new Book();
    newBook.author = author;
    newBook.title = title;
    newBook.description = description;
    if (rating) newBook.rating = rating;
    if (nbVoters) newBook.nbVoters = nbVoters;
    if (img) newBook.img = img;

    const result = await newBook.save();

    if (!result) return res.status(500).json({ msg: "" });

    return res.status(201).json({ msg: "ADDED SUCCESSFULLY", result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "error" });

    const bookToUpdate = await Book.findById(id);
    

    const result = await Book.updateOne({ _id: id }, {...req.body,rating:bookToUpdate.rating+1});
    if (!result) return res.status(400).json({ msg: "ERROR" });
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ err: "ERROR" });
    const result = await Book.deleteOne({ _id: id });
    if (!result) return res.status(400).json({ msg: "ERROR" });
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
