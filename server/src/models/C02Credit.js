const mongoose = require('mongoose');
const Credit = require('./Credit');

const c02FormSchema = new mongoose.Schema({
  treeCount: { type: Number, required: true, min: 1 },
  treeType: { type: String, required: true },
  age: { type: Number, required: true, min: 3, max: 15 },
});

const C02Credit = Credit.discriminator('c02', new mongoose.Schema({
  form: { type: c02FormSchema, required: true },
}));

module.exports = C02Credit;