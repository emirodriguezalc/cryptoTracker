import CryptoItem from "../types/cryptoItem";


export const fetchCryptoItems = async (): Promise<CryptoItem[]> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h,7d&per_page=10&page=1'
    );
    const data = await response.json();

    const cryptoItems: CryptoItem[] = data.map((item: any) => {
      const {
        id,
        name,
        symbol,
        current_price: currentPrice,
        market_cap_rank: marketCapRank,
        price_change_percentage_24h_in_currency: priceChangePercentage24h,
        price_change_percentage_7d_in_currency: priceChangePercentage7d,
      } = item;

      return {
        id,
        name,
        symbol,
        currentPrice,
        marketCapRank,
        priceChangePercentage24h,
        priceChangePercentage7d,
      };
    });

    return cryptoItems;
  } catch (error) {
    throw new Error('Failed to fetch crypto items');
  }
};
