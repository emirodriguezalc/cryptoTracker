import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';


const ListHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.rankLabel}>Rank</Text>
      <Text style={styles.infoLabel}>Name</Text>
      <Text style={styles.priceLabel}>Price</Text>
      <View style={styles.changeLabelContainer}>
        <Text style={styles.changeLabel}>24h</Text>
        <Text style={styles.changeLabel}>7d</Text>
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
    color: '#9b51e0',
  },
  infoLabel: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9b51e0',
  },
  priceLabel: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9b51e0',
    textAlign: 'left',
  },
  changeLabelContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  changeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9b51e0',
    marginLeft: 8,
  },
});

export default ListHeader;
