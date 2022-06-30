const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    }

})

module.exports = billSchema;