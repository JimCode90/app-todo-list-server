const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require("cors");
const { default: mongoose } = require('mongoose')
const { Tasks } = require('./models/Tasks')
const tasks = require("./routes/tasks");
const connection = require("./db");

connection()

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use("/api/tasks", tasks);

app.listen(5000, () => {
    console.log("Ok")
})