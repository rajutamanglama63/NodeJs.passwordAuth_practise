const { static } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// connect to MongoDB database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
    .then(() => console.log("MongoDB connection established..."))
    .catch((err) => console.log(err));


// Ejs middleware
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));

// BodyParser middleware
app.use(express.urlencoded({extended:false}));


// Routes middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);



app.listen(PORT, () => {
    console.log(`Server running on port:http://localhost:${PORT}`);
})