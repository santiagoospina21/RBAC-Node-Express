const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  productName: String, //Por default se pone en requierido. Para no requirido { type: String, required: false },
  price: Number,
});

const Record = new mongoose.model("Record", recordSchema);

module.exports = Record;
