const fetchUSDTPrice = async (options) => {
  const response = await fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", options);
  const data = await response.json();

  if (data.code !== "000000") {
    throw new Error("Error fetching data");
  }

  return data.data[2].adv.price;
};

const optionsVes = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    proMerchantAds: false,
    page: 1,
    rows: 10,
    payTypes: ["PagoMovil"],
    countries: [],
    publisherType: "merchant",
    tradeType: "SELL",
    asset: "USDT",
    fiat: "VES",
    merchantCheck: true,
    transAmount: "1000",
  }),
};

const optionsClp = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    proMerchantAds: false,
    page: 1,
    rows: 10,
    payTypes: [],
    countries: [],
    publisherType: null,
    tradeType: "BUY",
    asset: "USDT",
    fiat: "CLP",
    merchantCheck: false,
    transAmount: "250000",
  }),
};

const calculateProfitRates = (rate, percentages) => {
  percentages.forEach((percentage) => {
    console.log(`Current Rate profit ${percentage}%: `, (rate * (1 - percentage / 100)));
  });
};

(async () => {
  try {
    const [USDTVESRate, USDTCLPRate] = await Promise.all([
      fetchUSDTPrice(optionsVes),
      fetchUSDTPrice(optionsClp),
    ]);

    console.log("USDTVES Rate:", USDTVESRate);
    console.log("USDTCLP Rate:", USDTCLPRate);

    const currentRate = (USDTVESRate / USDTCLPRate)* 1000;
    console.log("Current Rate: ", currentRate);

    const profitPercentages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
    calculateProfitRates(currentRate, profitPercentages);
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
})();