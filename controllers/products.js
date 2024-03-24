const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const myData = await Product.find(req.query);
  res.status(200).json({ myData });
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "This is the route for the testin the API." });
};

const addProduct = async (req, res) => {
  try {
    const { name, price, featured, rating, company } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      featured,
      rating,
      company,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Redirect to a success page or send a success response
    res.status(201).send("Product added successfully!");
  } catch (error) {
    // Handle any errors that occur during product creation
    console.error("Error adding product:", error);
    res.status(500).send("An error occurred while adding the product.");
  }
};

module.exports = { getAllProducts, getAllProductsTesting, addProduct };
