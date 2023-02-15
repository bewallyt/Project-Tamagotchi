import AppleHealthKit, { HKWorkoutQueriedSampleType, HealthInputOptions } from 'react-native-health';
import { differenceInMinutes } from 'date-fns';

import { promisify } from 'utils/promise';
import { ONE_WEEK_AGO_ISO } from 'utils/dateHelpers';

import { WorkoutType, activityToType } from '../activityTypes';

const DEFAULT_OPTIONS = {
  startDate: ONE_WEEK_AGO_ISO,
  endDate: new Date().toISOString(),
  type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
};

async function getWorkoutsAsync(options?: HealthInputOptions): Promise<HKWorkoutQueriedSampleType[]> {
  const getWorkoutsAsync = promisify<HKWorkoutQueriedSampleType[]>(AppleHealthKit.getSamples);
  return getWorkoutsAsync({
    ...DEFAULT_OPTIONS,
    ...options,
  });
}

function getWorkoutMinutes(workouts: HKWorkoutQueriedSampleType[]): {
  [WorkoutType.CARDIO]: number;
  [WorkoutType.STRENGTH]: number;
} {
  return workouts.reduce(
    (acc, { start, end, activityName }) => {
      if (activityToType[activityName] === WorkoutType.CARDIO) {
        acc[WorkoutType.CARDIO] += differenceInMinutes(new Date(end), new Date(start));
      }
      if (activityToType[activityName] === WorkoutType.STRENGTH) {
        acc[WorkoutType.STRENGTH] += differenceInMinutes(new Date(end), new Date(start));
      }
      return acc;
    },
    {
      [WorkoutType.CARDIO]: 0,
      [WorkoutType.STRENGTH]: 0,
    }
  );
}

export { getWorkoutsAsync, getWorkoutMinutes };
