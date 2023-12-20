const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({'updatedAt':-1});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.view += 1;
    await product.save({ timestamps: false})
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({category: category});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const {_id} = req.body;
    if(_id != null) {
      await Product.findOneAndUpdate(
        {_id},
        {...req.body},
        {upsert: true},
      )
    } else {
      var count = Product.countDocuments({}).exec(); 
      await Product.create({
        ...req.body, 
        sort: 0
      })
    }
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const {_id} = req.body;
  try {
    await Product.deleteOne(
      {_id},
    )
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProductsByCategory,
  getProducts,
  getProductById,
  addProduct,
  deleteProduct
};
