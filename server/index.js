const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/main");


// CONNECTION TO DATABASE
mongoose.connect("mongodb+srv://joanamastianica:root2025@cluster0.l8vzeuj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("CONNECT SUCCESS")
}).catch((err) => {
    console.log(err)
})


app.use(cors());
app.use(express.json());
app.use("/", router)



// ALL PROJECT SCHEMAS
const userSchema = require("./schemas/userSchema");
const createBookSchema = require("./schemas/createBookSchema");
const createBookNoteSchema = require("./schemas/createBookNoteSchema");


// TEST
const createUser = async () => {

    const test = {
        firstName: "Joana",
        email: "joana@gmail.com",
        password: "password",
        profilePicture: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",

    }

    const newUser = userSchema({
        firstName: test.firstName,
        email: test.email,
        password: test.password,
        profilePicture: test.profilePicture,
    })

    await newUser.save()
}

// createUser()

// TEST

const findOneUser = async () => {

    const findUserByEmail = await userSchema.findOne({ email: "joana@gmail.com" })

    console.log(findUserByEmail)
}

// findOneUser()

// TEST
const findBooksInProgress = async () => {

    const booksInProgress = await createBookSchema.find({ isFinished: false })

    console.log(booksInProgress)
}

// findBooksInProgress()



app.listen(4005, () => {
    console.log("Api working!")
});