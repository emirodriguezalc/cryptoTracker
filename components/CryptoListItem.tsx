import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CryptoItem from '../types/cryptoItem';

interface CryptoListItemProps {
  item: CryptoItem;
  onPress: () => void;
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ item, onPress }) => {
  const {
    name,
    symbol,
    currentPrice,
    marketCapRank,
    priceChangePercentage24h,
    priceChangePercentage7d,
  } = item;

  const renderChangePercentage = (percentage: number) => {
    const formattedPercentage = percentage.toFixed(1);
    const isPositive = percentage > 0;
    const sign = isPositive ? '+' : '';

    return (
      <Text style={styles.changePercentage}>
        {sign}{formattedPercentage}%
      </Text>
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>#{marketCapRank}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{currentPrice.toFixed(1)}</Text>
        </View>
        <View style={styles.changeContainer}>
          {renderChangePercentage(priceChangePercentage24h)}
          {renderChangePercentage(priceChangePercentage7d)}
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ffffff" />
      </View>
    </TouchableOpacity>
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
    marginRight: 0.5,
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
    alignItems: 'center',
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
