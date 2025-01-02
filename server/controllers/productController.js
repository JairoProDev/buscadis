const Product = require("../models/productModel");
const { incrementPostCounter } = require("./postCounterController");

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(300)
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los productos" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener el producto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Object.assign(product, req.body);
    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el producto" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
