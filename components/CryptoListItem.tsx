import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>#{marketCapRank}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>€{currentPrice.toFixed(1)}</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text style={styles.changePercentage}>
          {priceChangePercentage24h.toFixed(1)}%
        </Text>
        <Text style={styles.changePercentage}>
          {priceChangePercentage7d.toFixed(1)}%
        </Text>
      </View>
        <Ionicons name="chevron-forward" size={24} color="#ffffff" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 8,
    backgroundColor: '#7bdcb5',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1.3,
    marginRight: 2,
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
    flex: 1.2,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rankContainer: {
    flex: 0.6,
    textAlign: 'center'
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changeContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  changePercentage: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CryptoListItem;
