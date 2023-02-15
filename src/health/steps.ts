import AppleHealthKit, { HealthValue } from 'react-native-health';

import { promisify } from 'utils/promise';
import { ONE_WEEK_AGO_ISO } from 'utils/dateHelpers';

async function getWeeklyStepCountsAsync(): Promise<HealthValue[]> {
  const getDailyStepCountAsync = promisify<HealthValue[]>(AppleHealthKit.getDailyStepCountSamples);
  return getDailyStepCountAsync({
    period: 60 * 24,
    startDate: ONE_WEEK_AGO_ISO,
  });
}

export { getWeeklyStepCountsAsync };
