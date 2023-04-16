const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model("book-app-users", userSchema);
module.exports = Product;