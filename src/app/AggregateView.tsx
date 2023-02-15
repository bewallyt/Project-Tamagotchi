import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { RenderWithLoadingView } from 'ui/common';

import { getWorkoutsAsync, getWorkoutMinutes, WorkoutType } from 'health';
import { usePromiseMemo } from 'utils/promise';
import { BEGINNING_OF_WEEK_ISO } from 'utils/dateHelpers';

export default function WorkoutView() {
  const { results, loading } = usePromiseMemo<{
    [WorkoutType.CARDIO]: number;
    [WorkoutType.STRENGTH]: number;
  }>(async () => {
    const workoutData = await getWorkoutsAsync({ startDate: BEGINNING_OF_WEEK_ISO });
    return getWorkoutMinutes(workoutData);
  }, []);
  console.log('---- aggregate view ----', results);
  return (
    <RenderWithLoadingView isLoading={loading}>
      <Text>{JSON.stringify(results)}</Text>
    </RenderWithLoadingView>
  );
}

const styles = StyleSheet.create({});
