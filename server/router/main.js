const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userProfileController = require("../controllers/userProfileController");
const createBookController = require("../controllers/createBookController");
const updateToBookIsFinished = require("../controllers/updateToBookIsFinishedController");
const deleteBook = require("../controllers/deleteBookControllers");
const getAllFinishedBooks = require("../controllers/getFinishedBooksControllers");
const getSingleBookPage = require("../controllers/getSingleBookPageController");
const bookNotesController = require("../controllers/bookNotesControllers");
const bookNotesControllers = require("../controllers/bookNotesControllers");

// AUTHENTIFICATION & AUTHORIZATION
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// USER PROFILE
router.get("/userProfile/:id", userProfileController.getUserProfile);
router.post("/profileImageUpload", userProfileController.uploadProfileImage);

// CREATE BOOK
router.post("/createBook/:id", createBookController.createBook);
router.get("/getBooksInProgress/:id", createBookController.getBooksInProgress);

// UPDATE TO BOOK IS FINISHED
router.post("/updateBookFinished/:id", updateToBookIsFinished.updateToBookIsFinished);

// DELETE BOOK IN PROGRESS
router.post("/deleteBook", deleteBook.deleteBookInProgress);
router.post("/deleteFinishedBook", deleteBook.deleteFinishedBook);

// GET ALL FINISHED BOOKS
router.get("/getFinishedBooks/:id", getAllFinishedBooks.finishedBooks);

// GET SINGLE BOOK PAGE
router.get("/singleBookPage/:bookId", getSingleBookPage.getSingleBook);

// BOOK NOTES CONTROLLERS
router.post("/addBookNote", bookNotesControllers.addBookNote);
router.get("/getBookNotes/:bookId", bookNotesController.getAllBookNotes);
router.post("/deleteBookNote", bookNotesController.deleteBookNote);
router.post("/updateBookNote", bookNotesController.updateBookNote);

module.exports = router;