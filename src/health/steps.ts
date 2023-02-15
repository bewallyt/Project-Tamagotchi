import AppleHealthKit, { HealthInputOptions, HealthValue } from 'react-native-health';

import { promisify } from 'utils/promise';
import { ONE_WEEK_AGO_ISO } from 'utils/dateHelpers';

async function getStepCountSamplesAsync(options?: HealthInputOptions): Promise<HealthValue[]> {
  const getDailyStepCountAsync = promisify<HealthValue[]>(AppleHealthKit.getDailyStepCountSamples);
  return getDailyStepCountAsync({
    period: 60 * 24,
    startDate: ONE_WEEK_AGO_ISO,
    ...options,
  });
}

function getTotalStepCount(stepData: HealthValue[]) {
  return Math.floor(
    stepData.reduce((acc, { value }) => {
      acc += value;
      return acc;
    }, 0)
  );
}

export { getStepCountSamplesAsync, getTotalStepCount };
