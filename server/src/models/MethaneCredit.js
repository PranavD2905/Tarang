const mongoose = require('mongoose');
const Credit = require('./Credit');

const methaneFormSchema = new mongoose.Schema({
  organicWaste: { type: Number, required: true, min: 0 }, // in Kg
});

const MethaneCredit = Credit.discriminator('methane', new mongoose.Schema({
  form: { type: methaneFormSchema, required: true },
}));

module.exports = MethaneCredit;