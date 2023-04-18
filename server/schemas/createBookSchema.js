const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createBookSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    isFinished: {
        type: Boolean,
        required: true,
    }
});

const Product = mongoose.model("book-app-created-books", createBookSchema);
module.exports = Product;