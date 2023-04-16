const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());





app.listen(4005, () => {
    console.log("Api working!")
});