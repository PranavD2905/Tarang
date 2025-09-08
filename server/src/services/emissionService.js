// Buyer emission calculation

const BuyerEmission = require('../models/BuyerEmission');

/**
 * Calculates a buyer's carbon emissions based on their inputs.
 * @param {object} data - The buyer's questionnaire data.
 * @returns {number} The calculated carbon emissions in an unspecified unit.
 */
const calculateEmissions = (data) => {
  const { energyUse, logisticsFuel, industrialProcesses, organicWaste } = data;
  
  // Formula: 0.82 * energyUse + 2.31 * logisticsFuel + 1.85 * industrialProcesses + 2.8 * organicWaste
  const calculatedEmissions = 
    (0.82 * energyUse) + 
    (2.31 * logisticsFuel) + 
    (1.85 * industrialProcesses) + 
    (2.8 * organicWaste);

  return calculatedEmissions;
};

/**
 * Saves a new buyer emission record to the database.
 * @param {object} data - The emission data.
 * @returns {Promise<object>} The created buyer emission document.
 */
const saveEmissionRecord = async (data) => {
  const { buyer, energyUse, logisticsFuel, industrialProcesses, organicWaste } = data;
  const calculatedEmissions = calculateEmissions(data);

  const emissionRecord = new BuyerEmission({
    buyer,
    energyUse,
    logisticsFuel,
    industrialProcesses,
    organicWaste,
    calculatedEmissions,
  });

  await emissionRecord.save();
  return emissionRecord;
};

module.exports = {
  calculateEmissions,
  saveEmissionRecord,
};