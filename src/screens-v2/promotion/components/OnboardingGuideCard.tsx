import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ArrowRight, Gift, Percent, Sprout } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { ONBOARDING_QUICK_ACTIONS } from '../data';

type Props = {
  step?: number;
  totalSteps?: number;
  title?: string;
  description?: string;
  onContinuePress?: () => void;
};

const QUICK_ICONS = {
  voucher: Percent,
  reward: Gift,
  combo: Sprout,
} as const;

const OnboardingGuideCard: React.FC<Props> = ({
  step = 2,
  totalSteps = 10,
  title = 'Chọn 1 trong 3 cách để nhận ưu đãi',
  description = 'Bạn có thể xem voucher, đổi quà từ điểm hoặc xem combo vụ mùa phù hợp.',
  onContinuePress,
}) => (
  <View style={styles.wrapper}>
    <Image source={Images.helpSupport} style={styles.mascot} resizeMode="contain" />

    <View style={styles.content}>
      <View style={styles.stepBadge}>
        <CText style={styles.stepText}>
          Bước {step}/{totalSteps}
        </CText>
      </View>

      <CText style={styles.title}>{title}</CText>
      <CText style={styles.description}>{description}</CText>

      <View style={styles.quickRow}>
        {ONBOARDING_QUICK_ACTIONS.map(action => {
          const Icon = QUICK_ICONS[action.id as keyof typeof QUICK_ICONS];
          return (
            <View key={action.id} style={styles.quickItem}>
              <View style={styles.quickIconWrap}>
                <Icon color={Colors.greenPrimary} size={14} />
              </View>
              <CText style={styles.quickLabel}>{action.label}</CText>
            </View>
          );
        })}
      </View>
    </View>

    <Pressable
      onPress={onContinuePress}
      style={({ pressed }) => [
        styles.continueButton,
        pressed && styles.continueButtonPressed,
      ]}
    >
      <ArrowRight color={Colors.h1} size={18} />
    </Pressable>
  </View>
);

export default memo(OnboardingGuideCard);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(8),
    marginBottom: scale(16),
    padding: scale(12),
    borderRadius: scale(16),
    backgroundColor: '#FFF8E8',
    borderWidth: 1,
    borderColor: '#F3E2A5',
  },
  mascot: {
    width: scale(56),
    height: scale(72),
    marginRight: scale(8),
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.yellow,
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    marginBottom: scale(6),
  },
  stepText: {
    fontSize: fontScale(10),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  title: {
    fontSize: fontScale(13),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: scale(4),
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: scale(10),
  },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    maxWidth: '48%',
  },
  quickIconWrap: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    flex: 1,
    fontSize: fontScale(9),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
  },
  continueButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(6),
  },
  continueButtonPressed: {
    opacity: 0.9,
  },
});
