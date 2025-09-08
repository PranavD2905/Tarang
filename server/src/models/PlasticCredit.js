const mongoose = require('mongoose');
const Credit = require('./Credit');

const plasticFormSchema = new mongoose.Schema({
  plasticWaste: { type: Number, required: true, min: 0 }, // in Kg
});

const PlasticCredit = Credit.discriminator('plastic', new mongoose.Schema({
  form: { type: plasticFormSchema, required: true },
}));

module.exports = PlasticCredit;