// Business logic (apply formulas, approve credits)

const C02Credit = require('../models/C02Credit');
const MethaneCredit = require('../models/MethaneCredit');
const PlasticCredit = require('../models/PlasticCredit');
const User = require('../models/User');

/**
 * Calculates the amount of credits based on the provided formula and type.
 * @param {string} type - The type of credit ('c02', 'methane', 'plastic').
 * @param {object} form - The form data containing the inputs for the calculation.
 * @returns {number} The calculated credit amount.
 */
const calculateCreditAmount = (type, form) => {
  let amount;
  switch (type) {
    case 'c02':
      // Formula: N*Y*absorption rate(22)/1000
      const absorptionRate = 22; // kg/year per tree
      amount = (form.treeCount * form.age * absorptionRate) / 1000;
      break;
    case 'methane':
      // Formula: W*80*28/100
      const methaneConversionFactor = 80;
      const ghgConversionFactor = 28;
      amount = (form.organicWaste * methaneConversionFactor * ghgConversionFactor) / 100;
      break;
    case 'plastic':
      // Formula: P*0.9
      const plasticConversionFactor = 0.9;
      amount = form.plasticWaste * plasticConversionFactor;
      break;
    default:
      amount = 0;
  }
  return amount;
};

/**
 * Creates a new credit submission based on the credit type.
 * @param {string} type - The type of credit ('c02', 'methane', 'plastic').
 * @param {object} data - The submission data including form, images, and geolocation.
 * @returns {Promise<object>} The created credit document.
 */
const createCredit = async (type, data) => {
  const { form, seller, imageUrl, geolocation, documentation, pricePerCredit } = data;
  const amount = calculateCreditAmount(type, form);

  let newCredit;
  switch (type) {
    case 'c02':
      newCredit = new C02Credit({
        seller,
        type,
        imageUrl,
        geolocation,
        documentation,
        form,
        amount,
        pricePerCredit,
      });
      break;
    case 'methane':
      newCredit = new MethaneCredit({
        seller,
        type,
        imageUrl,
        geolocation,
        documentation,
        form,
        amount,
        pricePerCredit,
      });
      break;
    case 'plastic':
      newCredit = new PlasticCredit({
        seller,
        type,
        imageUrl,
        geolocation,
        documentation,
        form,
        amount,
        pricePerCredit,
      });
      break;
    default:
      throw new Error('Invalid credit type');
  }

  await newCredit.save();

    // Find the seller and update their credits
  const sellerUser = await User.findById(seller);
  if (sellerUser) {
    sellerUser.creditsOwned += amount;
    await sellerUser.save();
  }
  return newCredit;
};

module.exports = {
  createCredit,
  calculateCreditAmount,
};