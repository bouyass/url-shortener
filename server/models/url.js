const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  long_url: { type: String, required: true },
  short_url: { type: String, required: true },
  conversion_date: { type: Date, required: true },
});

module.exports = mongoose.model('Url', urlSchema);