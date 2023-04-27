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
app.use("/", router);


app.listen(4005, () => {
    console.log("Api working!")
});