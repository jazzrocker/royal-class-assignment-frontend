module.exports = {
  getUserIP: async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to get IP:", error);
      return null;
    }
  },

  getCardType: (cardNumber) => {
    if (!cardNumber) return "Unknown";
  
    const cleaned = cardNumber.replace(/[\s-]/g, "");
  
    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned) || /^2[2-9]/.test(cleaned)) return "Mastercard";
  
    return "Unknown";
  },  

  convertAEDtoUSD: (aedAmount) => {
    const exchangeRate = 0.263;
    if (typeof aedAmount !== "number" || isNaN(aedAmount)) return 0;
  
    const usdAmount = aedAmount * exchangeRate;
    return Math.floor(usdAmount);
  }
  
};
