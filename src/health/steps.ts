import AppleHealthKit, { HealthValue } from 'react-native-health';
import { subDays } from 'date-fns';

import { promisify } from 'utils';

async function getWeeklyStepCountsAsync(): Promise<HealthValue[]> {
  const getDailyStepCountAsync = promisify<HealthValue[]>(AppleHealthKit.getDailyStepCountSamples);
  return getDailyStepCountAsync({
    period: 60 * 24,
    startDate: new Date(subDays(new Date(), 6).toDateString()).toISOString(),
  });
}

export { getWeeklyStepCountsAsync };
