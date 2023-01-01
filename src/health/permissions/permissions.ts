import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

import { promisify } from 'utils/promise';

/* Permission options */
export const PERMISSIONS = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.ActivitySummary,
    ],
    write: [],
  },
} as HealthKitPermissions;

async function initHealthKitAsync(permissions: HealthKitPermissions): Promise<HealthValue> {
  const initAsync = promisify<HealthValue>(AppleHealthKit.initHealthKit);
  let result: HealthValue;
  try {
    result = await initAsync(permissions);
    console.log('[SUCCESS] Granted permissions!');
  } catch (e) {
    console.log('[ERROR] Cannot grant permissions!', e);
    throw new Error(e);
  }
  return result;
}

export default { initHealthKitAsync };
