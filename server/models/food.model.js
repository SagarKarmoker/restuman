const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    _id : {
        type: String,
    },
    foodName: {
        type: String,
        required: true,
        trim: true,
    },
    foodImage: {
        type: String,
        required: true,
    },
    foodCategory: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    addBy: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
        },
    },
    foodOrigin: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    purchaseCount: {
        type: Number,
        default: 0,
    },
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
