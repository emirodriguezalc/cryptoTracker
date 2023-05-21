import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchCryptoDetails } from '../api/fetchCryptoDetails';
import CryptoItem from '../types/cryptoItem';

interface CryptoDetailsProps {
  crypto: CryptoItem;
  onClose: () => void;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ crypto, onClose }) => {
  const [details, setDetails] = useState<any>(null); // State to store the fetched details
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
      <Text>{value}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Failed to fetch crypto details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{crypto.name}</Text>
      <Text style={styles.subtitle}>{crypto.symbol}</Text>
      {renderDetailItem('Price (USD):', details.price.usd.toString())}
      {renderDetailItem('Price (EUR):', details.price.eur.toString())}
      {renderDetailItem('Price (GBP):', details.price.gbp.toString())}
      {renderDetailItem('Market Cap:', details.marketCap.toString())}
      {renderDetailItem('24-hour Trading Volume:', details.volume.toString())}
      {renderDetailItem('Circulating Supply:', details.circulatingSupply.toString())}
      {renderDetailItem('Total Supply:', details.totalSupply.toString())}
      {renderDetailItem('All-time High Price:', details.allTimeHigh.toString())}
      {renderDetailItem('All-time Low Price:', details.allTimeLow.toString())}
      {/* Render the price chart here */}
      {/* Replace the chart component with the actual chart library of your choice */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Price Chart (Last 30 days)</Text>
        {/* Render the price chart here */}
      </View>
      {/* Close button */}
      <Text style={styles.closeButton} onPress={onClose}>X</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Gray overlay background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 16,
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CryptoDetails;
