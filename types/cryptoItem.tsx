interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  marketCapRank: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
}

export default CryptoItem;
