import AppleHealthKit, { HealthInputOptions, HealthValue } from 'react-native-health';
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

import { promisify } from 'utils/promise';
import { ONE_WEEK_AGO_ISO } from 'utils/dateHelpers';

// Note(Benson): HealthValue has value typed as number but value is actually number for sleep sample.
export interface ISleepValue extends Omit<HealthValue, 'value'> {
  value: SleepType;
}

export type SleepType = 'CORE' | 'REM' | 'AWAKE' | 'INBED' | 'DEEP';

async function getSleepSamplesAsync(options?: HealthInputOptions): Promise<ISleepValue[]> {
  const getDailySleepAsync = promisify<ISleepValue[]>(AppleHealthKit.getSleepSamples);
  return getDailySleepAsync({
    period: 60 * 24,
    startDate: ONE_WEEK_AGO_ISO,
    ...options,
  });
}

function getTotalSleepTime(stepData: ISleepValue[]) {
  return (
    stepData.reduce((acc, { value, startDate, endDate }) => {
      if (value === 'AWAKE' || value === 'INBED') {
        return acc;
      }
      return (acc += differenceInSeconds(new Date(endDate), new Date(startDate)));
    }, 0) / 3600
  );
}

export { getSleepSamplesAsync, getTotalSleepTime };
