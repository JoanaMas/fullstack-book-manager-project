const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createBookNoteSchema = new Schema({
    bookId: {
        type: String,
        required: true,
    },
    bookNote: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("book-app-created-book-notes", createBookNoteSchema);
module.exports = Product;