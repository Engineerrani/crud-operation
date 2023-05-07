require("dotenv").config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("./db/conn");
const users = require("./models/userSchema")
const cors = require("cors")
const router = require("./routes/router")

const DB = "mongodb+srv://rani:1234@cluster0.wues2mw.mongodb.net/mernstack?retryWrites=true&w=majority"

const port = 8003;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, ()=>{
    console.log(`Server is start port number ${port}`)
});
