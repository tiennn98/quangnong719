import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type Props = {
  show: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

const FadeUp = memo(({show, children, style, duration = 220}: Props) => {
  const opacity = useRef(new Animated.Value(show ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(show ? 0 : 10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: show ? 1 : 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: show ? 0 : 10,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [show, duration, opacity, translateY]);

  if (!show) {return null;}

  return (
    <Animated.View style={[style, {opacity, transform: [{translateY}]}]}>
      {children}
    </Animated.View>
  );
});

export default FadeUp;
