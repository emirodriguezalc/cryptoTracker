import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type CryptoChartProps = {
  coinId: string;
};

type CryptoChartData = {
  labels: string[];
  dotLabels: string[];
  datasets: {
    data: number[];
  }[];
};

const CryptoChart: React.FC<CryptoChartProps> = ({ coinId }) => {
  const [chartData, setChartData] = useState<CryptoChartData | null>(null);
  const [selectedDotData, setSelectedDotData] = useState<{ date: string; price: number } | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
        );
        const data = await response.json();

        const filteredData = data.prices.reduce((result: number[][], price: any) => {
          const date = new Date(price[0]);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
          const existingIndex = result.findIndex((item) => item[0].toString() === formattedDate);
          if (existingIndex === -1) {
            result.push([formattedDate, price[1]]);
          } else {
            // Update the price if there's already an entry for the same date
            result[existingIndex][1] = price[1];
          }
          return result;
        }, []);

        const labels = filteredData
          .map((price: any, index: number) => {
            // Show labels for every fifth day
            if (index % 5 === 0) {
              return price[0];
            }
            return '';
          })
          .filter((label: string) => label !== '');

        const dotLabels = filteredData
          .map((price: any, index: number) => {
            return price[0];
          })
          .filter((label: string) => label !== '');

        setChartData({
          labels,
          dotLabels,
          datasets: [
            {
              data: filteredData.map((price: any) => price[1]),
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartData();
  }, [coinId]);

  const handleDotPress = (data: { index: number }) => {
    const { index } = data;
    const date = chartData?.dotLabels[index];
    const price = chartData?.datasets[0].data[index].toFixed(2);
    console.log(chartData);
    setSelectedDotData({ date, price });
  };

  const handleOutsidePress = () => {
    // Reset the selectedDotData when touching outside the globe container
    setSelectedDotData(null);
  };

  if (!chartData) {
    // Render loading state or fallback component while data is being fetched
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.touchWrapper} onPress={handleOutsidePress}>
      <View style={styles.container}>
        <Text style={styles.chartLabel}>Price Chart (Last 30 days)</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "black",
              fill: "#7bdcb5",
            },
            style: {
              borderRadius: 10,
            },
          }}
          bezier
          onDataPointClick={handleDotPress}
        />
        {selectedDotData && (
          <View style={styles.globeContainer}>
            <Text style={styles.globeText}>{`Date: ${selectedDotData.date}`}</Text>
            <Text style={styles.globeText}>{`Price: $${selectedDotData.price}`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>

  );
};


const styles = StyleSheet.create({
  touchWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 10,
  },
  globeContainer: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: Dimensions.get('window').width / 3,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(123, 220, 181, 0.7)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  globeText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 34,
    padding: 16,
    color: '#28004B'
  },
});

export default CryptoChart;
