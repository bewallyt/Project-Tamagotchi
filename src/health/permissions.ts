import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { format, subMinutes } from 'date-fns';

import { promisify } from 'utils';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
    ],
    write: [],
  },
} as HealthKitPermissions;

async function testHealthKitAsync(): Promise<{ heartRateSamples: HealthValue[]; stepCountSamples: HealthValue[] }> {
  console.log('----- [TEST] invoking testHealthKit -----');
  await initHealthKitAsync(permissions);

  const getHeartRateSamplesAsync = promisify<HealthValue[]>(AppleHealthKit.getHeartRateSamples);
  const getDailyStepCountAsync = promisify<HealthValue[]>(AppleHealthKit.getDailyStepCountSamples);

  const heartRateSamples = await getHeartRateSamplesAsync({
    startDate: format(subMinutes(new Date(), 5), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
  });
  const stepCountSamples = await getDailyStepCountAsync({
    startDate: new Date(new Date().toDateString()).toISOString(),
  });

  return {
    heartRateSamples,
    stepCountSamples,
  };
}

async function initHealthKitAsync(permissions: HealthKitPermissions): Promise<HealthValue> {
  const initAsync = promisify<HealthValue>(AppleHealthKit.initHealthKit);
  let result: HealthValue;
  try {
    result = await initAsync(permissions);
    console.log('[SUCCESS] Granted permissions!');
  } catch (e) {
    console.log('[ERROR] Cannot grant permissions!');
    throw new Error(e);
  }
  return result;
}

export default { testHealthKitAsync };
