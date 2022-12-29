import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';

import { HealthValue } from 'react-native-health';

import { permissions } from 'health';
import { usePromiseMemo } from 'hooks';

export default function App() {
  const { results, loading } = usePromiseMemo<{ heartRateSamples: HealthValue[]; stepCountSample: HealthValue }>(
    permissions.testHealthKitAsync,
    []
  );
  if (loading) {
    return <Text>Fetching Data....</Text>;
  }
  console.log(results);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(results)}</Text>
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
