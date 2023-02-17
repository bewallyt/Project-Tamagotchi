import React, { useRef, useEffect, ReactElement } from 'react';
import { Easing, TextInput, Animated, View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Props {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  max?: number;
  textColor?: string;
}

const Donut = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 1000,
  color = 'tomato',
  delay = 0,
  textColor,
  max = 100,
}: Props): ReactElement => {
  const animated = useRef(new Animated.Value(0)).current;

  const circleRef = useRef<Circle>();
  const inputRef = useRef<TextInput>();

  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    const timing = Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });
    timing.start(() => {
      animation(toValue === 0 ? percentage : 0);
    });
    return timing;
  };

  useEffect(() => {
    const animationTiming = animation(percentage);
    animated.addListener((v) => {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          // @ts-ignore
          strokeDashoffset,
        });
      }
      if (v.value === percentage) {
        animated.removeAllListeners();
      }
    });
    return () => {
      animated.removeAllListeners();
    };
  }, []);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[StyleSheet.absoluteFillObject, { fontSize: radius / 2, color: textColor ?? color }, styles.text]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});

export default Donut;
