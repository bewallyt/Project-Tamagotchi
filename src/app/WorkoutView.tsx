import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { HealthValue } from 'react-native-health';

import { getWorkoutsAsync } from 'health';
import { usePromiseMemo } from 'hooks';

export default function StepView() {
  const { results, loading } = usePromiseMemo<HealthValue[]>(() => getWorkoutsAsync(), []);

  if (loading) {
    return <Text>Fetching Data....</Text>;
  }

  console.log(results);
  return (
    <View style={styles.container}>
      {results.map((hv: HealthValue, i) => {
        return (
          <View key={i} style={styles.textContainer}>
            <View style={styles.textContentContainer}>
              <Text>{JSON.stringify(hv)}</Text>
            </View>
          </View>
        );
      })}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  textContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
  },
});
