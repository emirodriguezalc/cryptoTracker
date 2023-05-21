
export const fetchCryptoDetails = async (cryptoItemId: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoItemId}`
    );
    const data = await response.json();

    const {
      market_data: { current_price, market_cap, total_volume, circulating_supply, total_supply, high_24h,
        low_24h },
    } = data;
    return {
      price: {
        usd: current_price?.usd,
        eur: current_price?.eur,
        gbp: current_price?.gbp,
      },
      marketCap: market_cap?.usd,
      volume: total_volume?.usd,
      circulatingSupply: circulating_supply,
      totalSupply: total_supply,
      allTimeHigh: high_24h?.usd,
      allTimeLow: low_24h?.usd,
    };
  } catch (error) {
    throw new Error(`Failed to fetch crypto details: ${error}`);
  }
};
