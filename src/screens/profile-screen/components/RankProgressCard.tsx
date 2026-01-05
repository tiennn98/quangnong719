import CText from '@/components/text';
import { Colors } from '@/themes';
import { Award, Sparkles } from 'lucide-react-native';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

interface RankProgressCardProps {
  currentRank: string;
  nextRank: string;
  currentValue: number;
  remainingValue: number;
  totalValueForNextRank: number;
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const RankProgressCard: React.FC<RankProgressCardProps> = memo(
  ({
    currentRank,
    nextRank,
    currentValue,
    remainingValue,
    totalValueForNextRank,
  }) => {
    const ratio = useMemo(() => {
      if (!totalValueForNextRank || totalValueForNextRank <= 0) {
        return 0;
      }
      return clamp(currentValue / totalValueForNextRank, 0, 1);
    }, [currentValue, totalValueForNextRank]);

    const currentText = useMemo(
      () => `${currentValue.toFixed(1)}M VND`,
      [currentValue],
    );
    const remainingText = useMemo(
      () => `${remainingValue.toFixed(1)}M nữa`,
      [remainingValue],
    );

    /** ===== Animations ===== */
    const appear = useRef(new Animated.Value(0)).current;
    const lift = useRef(new Animated.Value(10)).current;
    const progress = useRef(new Animated.Value(0)).current;
    const sparkle = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
      appear.setValue(0);
      lift.setValue(10);
      progress.setValue(0);
      sparkle.setValue(0.9);

      Animated.parallel([
        Animated.timing(appear, {
          toValue: 1,
          duration: 240,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(lift, {
          toValue: 0,
          duration: 240,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),

        Animated.timing(progress, {
          toValue: ratio,
          duration: 700,
          delay: 120,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.delay(180),
          Animated.spring(sparkle, {
            toValue: 1.12,
            useNativeDriver: true,
            speed: 18,
            bounciness: 10,
          }),
          Animated.spring(sparkle, {
            toValue: 1,
            useNativeDriver: true,
            speed: 18,
            bounciness: 10,
          }),
        ]),
      ]).start();
    }, [appear, lift, progress, sparkle, ratio]);

    const fillWidth = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: appear,
            transform: [{translateY: lift}],
          },
        ]}>
        <View style={styles.titleRow}>
          <View style={styles.iconBadge}>
            <Award size={18} color={Colors.yellow} />
          </View>
          <CText style={styles.title}>Tiến độ Hạng</CText>
        </View>

        <View style={styles.rankRow}>
          <View>
            <CText style={styles.label}>Hạng hiện tại</CText>
            <CText style={styles.rankText}>{currentRank}</CText>
          </View>

          <View style={styles.nextCol}>
            <View style={styles.nextRow}>
              <CText style={styles.label}>Hạng tiếp theo</CText>
              <Animated.View style={{transform: [{scale: sparkle}]}}>
                <Sparkles
                  size={16}
                  color={Colors.yellow}
                  style={{marginLeft: scale(6)}}
                />
              </Animated.View>
            </View>
            <CText style={styles.rankText}>{nextRank}</CText>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {width: fillWidth}]} />
        </View>

        <View style={styles.valueRow}>
          <CText style={styles.currentValue}>{currentText}</CText>
          <CText style={styles.remainingValue}>{remainingText}</CText>
        </View>
      </Animated.View>
    );
  },
);

export default RankProgressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    marginHorizontal: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  iconBadge: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255,215,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  title: {
    fontSize: fontScale(16),
    fontWeight: '800',
    color: Colors.h1,
  },

  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  label: {
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.55)',
  },
  rankText: {
    marginTop: scale(2),
    fontSize: fontScale(20),
    fontWeight: '900',
    color: Colors.h2,
  },
  nextCol: {alignItems: 'flex-end'},
  nextRow: {flexDirection: 'row', alignItems: 'center'},

  progressTrack: {
    height: scale(10),
    borderRadius: scale(999),
    backgroundColor: 'rgba(11,43,30,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: scale(999),
    backgroundColor: Colors.greenPrimary,
  },

  valueRow: {
    marginTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentValue: {
    fontSize: fontScale(13),
    fontWeight: '700',
    color: Colors.h1,
  },
  remainingValue: {
    fontSize: fontScale(13),
    color: 'rgba(0,0,0,0.55)',
  },
});
