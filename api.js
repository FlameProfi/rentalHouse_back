require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./routes/auth");
const house = require("./routes/house");
const reservations = require("./routes/reservations");

const app = express();

// parse Data
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/auth", auth);
app.use("/house", house);
app.use("/reservations", reservations);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running.",
  });
});

//handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

const port = 5000;

async function main() {
  await mongoose.connect(
    "mongodb://localhost:27017/hi_xueta"
  );
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
