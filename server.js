const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./backend/routes/authRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.json()); // to accpet json data

const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/auth", authRoutes); // route to authenticate user using Google OAuth2.0 and verify email


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});



const server = app.listen(
  PORT,
  console.log(`Server running on PORT : http://localhost:${PORT}`.yellow.bold)
);
