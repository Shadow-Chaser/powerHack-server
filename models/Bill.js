const mongoose = require('mongoose');
const billSchema = require('../schemas/billSchema');

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;