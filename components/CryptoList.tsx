import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { fetchCryptoItems } from '../api/fetchCryptoItems';
import CryptoListItem from './CryptoListItem';
import CryptoItem from '../types/cryptoItem';
import ListHeader from './ListHeader';

interface CryptoListProps { }

const CryptoList: React.FC<CryptoListProps> = () => {
  const [cryptoItems, setCryptoItems] = useState<CryptoItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    if (loading || error) {
      return;
    }

    try {
      setLoading(true);
      const data = await fetchCryptoItems(page);
      if (data.length < 1) {
        setError(true);
        setLoading(false);
        return null;
      }
      setCryptoItems((prevItems) => {
        if (page === 1) {
          return data;
        } else {
          return [...prevItems, ...data];
        }
      });
      setPage((prevPage) => prevPage + 1);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: CryptoItem }) => {
    return <CryptoListItem item={item} />;
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto List</Text>
      <ListHeader />
      <View style={styles.listContainer}>
        {cryptoItems.length ? (
          <FlatList
            data={cryptoItems}
            keyExtractor={(item, index) => `${item.id.toString()}__${index}`}
            renderItem={renderItem}
            initialNumToRender={10}
            windowSize={2}
            contentContainerStyle={styles.listContent}
            onEndReached={fetchCryptoData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text style={styles.emptyText}>The emptiness... maybe turn it off and on again?</Text>
        )}
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
    height: '85%',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 2,
    marginRight: 2,
  },
  listContent: {
    paddingBottom: 2,
    paddingTop: 2,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default CryptoList;
