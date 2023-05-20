import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CryptoItem from '../types/cryptoItem';

interface CryptoListItemProps {
  item: CryptoItem;
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ item }) => {
  const {
    name,
    symbol,
    currentPrice,
    marketCapRank,
    priceChangePercentage24h,
    priceChangePercentage7d,
  } = item;
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>#{marketCapRank}</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text style={styles.changePercentage24h}>
          {priceChangePercentage24h.toFixed(2)}%
        </Text>
        <Text style={styles.changePercentage7d}>
          {priceChangePercentage7d.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#7bdcb5',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  symbol: {
    fontSize: 14,
    color: '#ffffff',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rankContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changeContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  changePercentage24h: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changePercentage7d: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CryptoListItem;
