import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Modal, TextInput } from 'react-native';
import { fetchCryptoItems } from '../api/fetchCryptoItems';
import CryptoListItem from './CryptoListItem';
import CryptoItem from '../types/cryptoItem';
import ListHeader from './ListHeader';
import CryptoDetails from './CryptoDetails';

interface CryptoListProps { }

const CryptoList: React.FC<CryptoListProps> = () => {
  const [cryptoItems, setCryptoItems] = useState<CryptoItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCryptoItems, setFilteredCryptoItems] = useState<CryptoItem[]>([]);

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

      setFilteredCryptoItems((prevItems) => {
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

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    filterCryptoItems(query);
  };

  const filterCryptoItems = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredItems = cryptoItems.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.symbol.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCryptoItems(filteredItems);
  };

  const renderItem = ({ item }: { item: CryptoItem }) => {
    const handleItemPress = () => {
      setSelectedCrypto(item);
      setShowDetails(true);
    };

    return <CryptoListItem item={item} onPress={handleItemPress} />;
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cryptocurrencies..."
          onChangeText={handleSearchQueryChange}
        />
      </View>
      <ListHeader />
      <View style={styles.listContainer}>
        {filteredCryptoItems.length ? (
          <FlatList
            data={filteredCryptoItems}
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
      {selectedCrypto && (
        <Modal visible={showDetails} animationType="slide">
          <CryptoDetails crypto={selectedCrypto} onClose={() => setShowDetails(false)} />
        </Modal>
      )}
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
  searchContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  listContainer: {
    width: '100%',
    height: '85%',
    marginTop: 16,
    marginBottom: 16,
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
