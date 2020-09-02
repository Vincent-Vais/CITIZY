const mongoose = require("mongoose");

resSchema = new mongoose.Schema({
  amazon: [],
  ebay: [],
});

module.exports = mongoose.model("Results", resSchema);
