import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChevronUp} from 'lucide-react-native';
import {Colors} from '@/themes';

export interface AccordionProps {
  question: string;
  answer: string;
  initialOpen?: boolean;
}

const CAccordionComponent: React.FC<AccordionProps> = ({
  question,
  answer,
  initialOpen = false,
}) => {
  const [open, setOpen] = useState(initialOpen);

  const contentHeightRef = useRef(0);
  const measuredRef = useRef(false);

  const heightAnim = useRef(new Animated.Value(initialOpen ? 1 : 0)).current;
  const rotateAnim = useRef(new Animated.Value(initialOpen ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(initialOpen ? 1 : 0)).current;

  const runAnim = useCallback(
    (toOpen: boolean) => {
      const toHeight = toOpen ? contentHeightRef.current : 0;

      Animated.timing(heightAnim, {
        toValue: toHeight,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: toOpen ? 1 : 0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: toOpen ? 1 : 0,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    },
    [heightAnim, rotateAnim, opacityAnim],
  );

  const toggle = useCallback(() => {
    setOpen(prev => {
      const next = !prev;
      runAnim(next);
      return next;
    });
  }, [runAnim]);

  const onMeasure = useCallback(
    (e: LayoutChangeEvent) => {
      const h = Math.ceil(e.nativeEvent.layout.height);
      if (!h) {
        return;
      }

      if (!measuredRef.current || Math.abs(h - contentHeightRef.current) > 4) {
        measuredRef.current = true;
        contentHeightRef.current = h;

        if (open) {
          heightAnim.setValue(h);
        } else if (initialOpen) {
          heightAnim.setValue(h);
          runAnim(true);
        }
      }
    },
    [open, heightAnim, initialOpen, runAnim],
  );

  useEffect(() => {
    if (!initialOpen) {
      heightAnim.setValue(0);
    }
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={toggle} style={styles.header} hitSlop={8}>
        <Text style={styles.question} numberOfLines={2}>
          {question}
        </Text>

        <Animated.View style={[styles.iconWrap, {transform: [{rotate}]}]}>
          <ChevronUp size={20} color="#0B2B1E" />
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.bodyContainer, {height: heightAnim}]}>
        <View
          pointerEvents="none"
          style={styles.measureLayer}
          onLayout={onMeasure}>
          <Text style={styles.answer}>{answer}</Text>
        </View>

        <Animated.View style={{opacity: opacityAnim}}>
          <Text style={styles.answer}>{answer}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const CAccordion = memo(
  CAccordionComponent,
  (prev, next) =>
    prev.question === next.question &&
    prev.answer === next.answer &&
    prev.initialOpen === next.initialOpen,
);

export default CAccordion;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.greenPrimary,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,43,30,0.07)',
  },

  bodyContainer: {
    paddingHorizontal: 14,
    overflow: 'hidden',
  },
  answer: {
    paddingBottom: 14,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.h2,
  },

  measureLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
  },
});
