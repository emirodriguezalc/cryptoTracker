import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import CryptoList from './components/CryptoList';

export default function App() {
  return (
    <View>
      <CryptoList />
      <StatusBar style="auto" />
    </View>
  );
}
