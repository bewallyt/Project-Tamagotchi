import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HealthValue } from 'react-native-health';

import { RenderWithLoadingView } from 'ui/common';

import { getWorkoutsAsync } from 'health';
import { usePromiseMemo } from 'hooks';

export default function WorkoutView() {
  const { results, loading } = usePromiseMemo<HealthValue[]>(() => getWorkoutsAsync(), []);
  console.log('-----Workout View------', { results, loading });
  return (
    <RenderWithLoadingView isLoading={false}>
      <ScrollView contentContainerStyle={styles.scrollView} scrollEnabled>
        {results?.length > 0 ? (
          results.map((hv: HealthValue, i) => {
            console.log(hv);
            return (
              <View key={i} style={styles.textContainer}>
                <View style={styles.textContentContainer}>
                  <Text>{JSON.stringify(hv)}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No Workouts</Text>
        )}
        <StatusBar style="auto" />
      </ScrollView>
    </RenderWithLoadingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
    display: 'flex',
    height: '100%',
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
