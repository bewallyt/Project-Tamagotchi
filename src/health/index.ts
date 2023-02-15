import { PERMISSIONS, permissions, usePermissions } from './permissions';
import { getStepCountSamplesAsync, getTotalStepCount } from './data/step';
import { getWorkoutsAsync, getWorkoutMinutes } from './data/workout';
import { getSleepSamplesAsync, getTotalSleepTime } from './data/sleep';
import { Activity, WorkoutType, getActivityName, activityToType } from './activityTypes';

export {
  permissions,
  usePermissions,
  PERMISSIONS,
  getStepCountSamplesAsync,
  getWorkoutsAsync,
  getWorkoutMinutes,
  Activity,
  WorkoutType,
  getActivityName,
  activityToType,
  getTotalStepCount,
  getSleepSamplesAsync,
  getTotalSleepTime,
};
