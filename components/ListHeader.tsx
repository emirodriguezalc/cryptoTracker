import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const ListHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.rankLabel}>Rank</Text>
      <Text style={styles.infoLabel}>Name</Text>
      <Text style={styles.priceLabel}>Price(usd)</Text>
      <View style={styles.changeLabelContainer}>
        <Text style={styles.changeLabel}>24h % dif</Text>
        <Text style={styles.changeLabel}>7d % dif</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    textAlignVertical: 'center',
  },
  rankLabel: {
    flex: 0.5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoLabel: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceLabel: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  changeLabelContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ListHeader;
