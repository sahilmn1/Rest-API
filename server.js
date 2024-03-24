require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const products_routes = require("./routes/products");
const connectDB = require("./db/connect");
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hii API is Live!");
});

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// Now we will create a middleware for this to access the products
app.use("/api/products", products_routes);
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server and DB is Connected port is ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
