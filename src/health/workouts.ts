import AppleHealthKit, { HealthInputOptions, HealthValue } from 'react-native-health';

import { promisify } from 'utils/promise';
import { ONE_WEEK_AGO_ISO } from 'utils/date-helpers';

const DEFAULT_OPTIONS = {
  startDate: ONE_WEEK_AGO_ISO,
  endDate: new Date().toISOString(),
  type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
};

async function getWorkoutsAsync(options?: HealthInputOptions): Promise<HealthValue[]> {
  const getWorkoutsAsync = promisify<HealthValue[]>(AppleHealthKit.getSamples);
  return getWorkoutsAsync({
    ...DEFAULT_OPTIONS,
    ...options,
  });
}

export { getWorkoutsAsync };
