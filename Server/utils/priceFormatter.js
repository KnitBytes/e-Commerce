// formats price and appends unit label
const formatPricePerUnit = (price, uom) => {
    return `Rs. ${price} / ${uom}`;
  };
  
  module.exports = {
    formatPricePerUnit
  };
  