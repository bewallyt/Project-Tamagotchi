/*
The string enums are what is returned from react-native-health's activityName attribute
*/
export enum Activity {
  BASKETBALL = 'Basketball',
  BOXING = 'Boxing',
  CLIMBING = 'Climbing',
  CROSS_TRAINING = 'CrossTraining',
  CYCLING = 'Cycling',
  DANCE = 'Dance',
  ELLIPTICAL = 'Elliptical',
  FUNCTIONAL_STRENGTH_TRAINING = 'FunctionalStrengthTraining',
  HIKING = 'Hiking',
  ROWING = 'Rowing',
  RUNNING = 'Running',
  SOCCER = 'Soccer',
  STAIR_CLIMBING = 'StairClimbing',
  SWIMMING = 'Swimming',
  TRACK_AND_FIELD = 'TrackAndField',
  TRADITIONAL_STRENGTH_TRAINING = 'TraditionalStrengthTraining',
  WALKING = 'Walking',
  CORE_TRAINING = 'CoreTraining',
  HIGH_INTENSITY_INTERVAL_TRAINING = 'HighIntensityIntervalTraining',
  JUMP_ROPE = 'JumpRope',
  SNOW_BOARDING = 'Snowboarding',
}

export enum WorkoutType {
  CARDIO = 'Cardio',
  STRENGTH = 'Strength',
}

export const activityToType = {
  [Activity.BASKETBALL]: WorkoutType.CARDIO,
  [Activity.BOXING]: WorkoutType.CARDIO,
  [Activity.CLIMBING]: WorkoutType.STRENGTH,
  [Activity.CROSS_TRAINING]: WorkoutType.CARDIO,
  [Activity.CYCLING]: WorkoutType.CARDIO,
  [Activity.DANCE]: WorkoutType.CARDIO,
  [Activity.ELLIPTICAL]: WorkoutType.CARDIO,
  [Activity.FUNCTIONAL_STRENGTH_TRAINING]: WorkoutType.STRENGTH,
  [Activity.HIKING]: WorkoutType.CARDIO,
  [Activity.ROWING]: WorkoutType.CARDIO,
  [Activity.RUNNING]: WorkoutType.CARDIO,
  [Activity.SOCCER]: WorkoutType.CARDIO,
  [Activity.STAIR_CLIMBING]: WorkoutType.CARDIO,
  [Activity.SWIMMING]: WorkoutType.CARDIO,
  [Activity.TRACK_AND_FIELD]: WorkoutType.CARDIO,
  [Activity.TRADITIONAL_STRENGTH_TRAINING]: WorkoutType.STRENGTH,
  [Activity.WALKING]: WorkoutType.CARDIO,
  [Activity.CORE_TRAINING]: WorkoutType.STRENGTH,
  [Activity.HIGH_INTENSITY_INTERVAL_TRAINING]: WorkoutType.STRENGTH,
  [Activity.JUMP_ROPE]: WorkoutType.CARDIO,
  [Activity.SNOW_BOARDING]: WorkoutType.CARDIO,
};

export function getActivityName(activity: Activity) {
  let activityName = '';
  for (let i = 0; i < activity.length; i++) {
    if (activity.charAt(i) === activity.charAt(i).toUpperCase() && i) {
      activityName = `${activityName} ${activity.charAt(i)}`;
      continue;
    }
    activityName = `${activityName}${activity.charAt(i)}`;
  }
  return activityName;
}
