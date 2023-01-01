import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HealthValue } from 'react-native-health';
import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';

import { RenderWithLoadingView } from 'ui/common';

import { getWeeklyStepCountsAsync } from 'health';
import { usePromiseMemo } from 'utils/promise';

export default function StepView() {
  const { results, loading } = usePromiseMemo<HealthValue[]>(() => getWeeklyStepCountsAsync(), []);
  console.log('-----Step View------', { results, loading });
  return (
    <RenderWithLoadingView isLoading={loading}>
      <View style={styles.container}>
        {results?.map(({ startDate, value }: HealthValue, i) => {
          console.log({ startDate, value });
          return (
            <View key={i} style={styles.textContainer}>
              <View style={styles.textContentContainer}>
                <Text>{`Date: ${format(new Date(startDate), 'MMM do')}`}</Text>
                <Text>{`Steps: ${Math.floor(value)}`}</Text>
              </View>
            </View>
          );
        })}
        <Text>{`Average Daily Steps: ${Math.floor(results?.reduce((acc, { value }) => acc + value, 0) / 7)}`}</Text>
        <StatusBar style="auto" />
      </View>
    </RenderWithLoadingView>
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
