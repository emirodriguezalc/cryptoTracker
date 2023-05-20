import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { fetchCryptoItems } from '../api/fetchCryptoItems';
import CryptoListItem from './CryptoListItem';
import CryptoItem from '../types/cryptoItem';

interface CryptoListProps {
  // Add any other props needed
}

const CryptoList: React.FC<CryptoListProps> = () => {
  const [cryptoItems, setCryptoItems] = useState<CryptoItem[]>([]);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptoItems();
      setCryptoItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: CryptoItem }) => {
    if (!item) {
      return null;
    }
    return <CryptoListItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto List</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={cryptoItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}
          windowSize={5}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  listContainer: {
    width: '100%',
    height: '90%',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 2,
    marginRight: 2,
  },
  listContent: {
    paddingBottom: 2,
    paddingTop: 2,
  },
});

export default CryptoList;
