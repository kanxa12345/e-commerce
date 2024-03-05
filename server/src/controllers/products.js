const Product = require("../models/product");

// add prodctCategory
const addProduct = async (req, res) => {
  // console.log(req.files);
  try {
    const existingProduct = await Product.findOne({
      product: req.body.product,
    });
    if (existingProduct) {
      return res.status(403).json({ msg: "Product already added." });
    } else {
      // req.body.productImage = req.file.filename;
      await Product.create(req.body);
      res.status(201).json({ msg: "Product added successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to add product." });
  }
};

//fetch products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (err) {
    console.log(err);
  }
};

const getProductDetailById = async (req, res) => {
  try {
    const productDetail = await Product.findById({ _id: req.params.id });
    res.json(productDetail);
  } catch (err) {
    console.log(err);
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const searchedProducts = await Product.find({
      product: { $regex: req.query.productName, $options: "i" },
    });
    res.json(searchedProducts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getFeatureProducts,
  getProductDetailById,
  getSearchProduct,
  getProductByCategory,
};
