// Model for Product
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type: String
    }
}, {timestamps: true})

const Product = mongoose.model('product', productSchema);

module.exports = Product;