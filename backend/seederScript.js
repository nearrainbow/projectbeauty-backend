require('dotenv').config()

const productData = require('./data/products')
const {connectDB} = require('./config/db')
const Product = require('./models/Product')

const categoryData = require('./data/categories')
const Category = require('./models/Category')

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany({})

    await Product.insertMany(productData)

    // await Category.insertMany(categoryData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()
