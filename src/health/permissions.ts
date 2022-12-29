import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { promisify } from 'utils';

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

async function testHealthKitAsync(): Promise<{ heartRateSamples: HealthValue[]; stepCountSample: HealthValue }> {
  console.log('----- [TEST] invoking testHealthKit -----');
  await initHealthKitAsync(permissions);
  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };
  const getHeartRateSamplesAsync = promisify<HealthValue[]>(AppleHealthKit.getHeartRateSamples);
  const getStepCountAsync = promisify<HealthValue>(AppleHealthKit.getStepCount);

  const heartRateSamples = await getHeartRateSamplesAsync(options);
  const stepCountSample = await getStepCountAsync(options);

  return {
    heartRateSamples,
    stepCountSample,
  };
}

async function initHealthKitAsync(permissions: HealthKitPermissions): Promise<HealthValue> {
  const initAsync = promisify<HealthValue>(AppleHealthKit.initHealthKit);
  let result: HealthValue;
  try {
    result = await initAsync(permissions);
    console.log('[SUCCESS] Granted permissions!', result);
  } catch (e) {
    console.log('[ERROR] Cannot grant permissions!');
    throw new Error(e);
  }
  return result;
}

export default { testHealthKitAsync };
