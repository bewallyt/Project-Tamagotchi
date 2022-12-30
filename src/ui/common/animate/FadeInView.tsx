import React, { useRef, useEffect, PropsWithChildren } from 'react';
import { Animated, StyleProp } from 'react-native';

import { ReactElement } from 'react';

// TODO(Benson): Fade out on unmount?
const FadeInView = ({
  duration = 2000,
  children,
  style,
}: PropsWithChildren<{ duration?: number; style?: StyleProp }>): ReactElement => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
