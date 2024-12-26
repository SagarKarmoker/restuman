const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    },
    foodName: {
        type: String,
        required: true,
    },
    foodQuantity: {
        type: Number,
        required: true,
    },
    foodPrice: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    totalOrderValue : {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
        match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
    },
}, {
    timestamps: true,
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
