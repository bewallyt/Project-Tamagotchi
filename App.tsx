import React, { useEffect } from 'react';
import 'expo-dev-client';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { permissions } from './src/health';

export default function App() {
  useEffect(() => {
    console.log('mountinggggggg');
    permissions.testHealthKit();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! - Benson Wally Tran</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
