const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const homeRoute = require("./routes/homeRoute");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

//Routes
app.use("/", homeRoute);

app.use("/login", loginRoute);

app.use("/register", registerRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started on PORT 5000");
});
