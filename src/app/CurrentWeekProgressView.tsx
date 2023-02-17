import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RenderWithLoadingView, Donut } from 'ui/common';

import {
  getWorkoutsAsync,
  getWorkoutMinutes,
  WorkoutType,
  getStepCountSamplesAsync,
  getTotalStepCount,
  getSleepSamplesAsync,
  getTotalSleepTime,
} from 'health';

import { usePromiseMemo } from 'utils/promise';
import { BEGINNING_OF_WEEK_ISO } from 'utils/dateHelpers';

/*
This view is used to depict the current week's progress for steps, strength, sleep, cardio.
TODO(Benson): Onboarding experience for setting goals.
*/

export default function CurrentWeekProgressView() {
  const { results, loading } = usePromiseMemo<{
    [WorkoutType.CARDIO]: number;
    [WorkoutType.STRENGTH]: number;
    steps: number;
    sleepTime: number;
  }>(async () => {
    const workoutData = await getWorkoutsAsync({ startDate: BEGINNING_OF_WEEK_ISO });
    const stepsData = await getStepCountSamplesAsync({ startDate: BEGINNING_OF_WEEK_ISO });
    const sleepData = await getSleepSamplesAsync({ startDate: BEGINNING_OF_WEEK_ISO });
    return {
      ...getWorkoutMinutes(workoutData),
      steps: getTotalStepCount(stepsData),
      sleepTime: getTotalSleepTime(sleepData),
    };
  }, []);
  console.log('---- aggregate view ----', results);
  /*
  TODO(Benson): 
  - Make donuts list items? Or have them floating over animation rendering 
  - Make donuts clickable? Make them smaller?
  - Add icon within the donut.
  - View for previous weeks?
  - TLDR will need a new place to put dense information.
  */
  return (
    <RenderWithLoadingView isLoading={loading}>
      <View style={styles.container}>
        <View style={styles.donutContainer}>
          <Donut color="lightblue" />
        </View>
        <View style={styles.donutContainer}>
          <Donut color="lightcoral" />
        </View>
        <View style={styles.donutContainer}>
          <Donut color="mediumspringgreen" />
        </View>
        <View style={styles.donutContainer}>
          <Donut color="dimgrey" />
        </View>
      </View>
    </RenderWithLoadingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
    marginTop: 48,
  },
  donutContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
});
