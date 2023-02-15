import { PERMISSIONS, permissions, usePermissions } from './permissions';
import { getStepCountSamplesAsync, getTotalStepCount } from './steps';
import { getWorkoutsAsync, getWorkoutMinutes } from './workouts';
import { getSleepSamplesAsync, getTotalSleepTime } from './sleep';
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
