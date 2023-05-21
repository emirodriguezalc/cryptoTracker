import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchCryptoDetails } from '../api/fetchCryptoDetails';
import CryptoItem from '../types/cryptoItem';
import CryptoChart from './CryptoChart';

interface CryptoDetailsProps {
  crypto: CryptoItem;
  onClose: () => void;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ crypto, onClose }) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoDetails(crypto.id)
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [crypto.id]);

  const renderDetailItem = (label: string, value: string) => (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to fetch crypto details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{crypto.name}</Text>
        <Text style={styles.subtitle}>{crypto.symbol}</Text>
      </View>
      <ScrollView>
        <View style={styles.infoContainer}>
          {renderDetailItem('Price (USD):', details.price.usd.toString())}
          {renderDetailItem('Price (EUR):', details.price.eur.toString())}
          {renderDetailItem('Price (GBP):', details.price.gbp.toString())}
          {renderDetailItem('Market Cap:', details.marketCap.toString())}
          {renderDetailItem('24-hour Trading Volume:', details.volume.toString())}
          {renderDetailItem('Circulating Supply:', details.circulatingSupply.toString())}
          {renderDetailItem('Total Supply:', details.totalSupply.toString())}
          {renderDetailItem('All-time High Price:', details.allTimeHigh.toString())}
          {renderDetailItem('All-time Low Price:', details.allTimeLow.toString())}
          <CryptoChart coinId={crypto.id} />
        </View>
      </ScrollView>
      {/* Close button */}
      <Text style={styles.closeButton} onPress={onClose}>
        X
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#7bdcb5',
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  subtitle: {
    fontSize: 16,
    color: 'white'
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 16,
    borderBottomColor: '#9b51e0',
    borderBottomWidth: 1,
    color: '#28004B'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28004B'
  },
  value: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    color: '#28004B'
  },
  chartContainer: {
    marginTop: 16,
  },

  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
});

export default CryptoDetails;
