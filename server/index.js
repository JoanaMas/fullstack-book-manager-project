const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// CONNECTION TO DATABASE
mongoose.connect("mongodb+srv://joanamastianica:root2025@cluster0.l8vzeuj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log("CONNECT SUCCESS")
}).catch((err) => {
  console.log(err)
})

// PROJECT SCHEMAS
const userSchema = require("./schemas/userSchema")

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


const findOneUser = async () => {

    const findUserByEmail = await userSchema.findOne({ email: "joana@gmail.com" })

    console.log(findUserByEmail)
}

// findOneUser()



// REGISTER USER
app.post("/register", async (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    const registeredUser = new userSchema({
        firstName: newUser.name,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.profilePicture,
    })

    // CHECKING IF USER ALREADY EXIST IN DATABASE WITH THE SAME EMAIL
    const findUserByEmail = await userSchema.findOne({ email: newUser.email });

    if(findUserByEmail) {
        return res.status(409).send({ error: "User with same email already exists." });
    } else {
        await registeredUser.save()
        res.send({ ok: "User registration successful" })
    }

})


app.listen(4005, () => {
    console.log("Api working!")
});