const getAvailability = (quantity) => {
    if (quantity > 100) return 'Available';
    if (quantity > 0) return 'Low in Stock';
    return 'Out of Stock';
  };
  
  module.exports = {
    getAvailability
  };
  