import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ShieldCheck, Sprout } from 'lucide-react-native';
import React, { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  avatarUri?: string | null;
  customerCode: string;
  memberLabel?: string;
  points?: number;
  onQrPress?: () => void;
  onGardenInfoPress?: () => void;
};

const CustomerSummaryCard: React.FC<Props> = ({
  avatarUri,
  customerCode,
  memberLabel = 'Member',
  points = 0,
  onQrPress,
  onGardenInfoPress,
}) => {
  const avatarSource = avatarUri ? { uri: avatarUri } : Images.logowhite;

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.avatarWrap}>
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoWrap}>
          <CText style={styles.label}>Mã khách hàng</CText>
          <CText style={styles.customerCode}>{customerCode}</CText>
          <View style={styles.memberRow}>
            <ShieldCheck color="#E6A100" size={14} fill="#FFF3D0" />
            <CText style={styles.memberText}>{memberLabel}</CText>
            <CText style={styles.dot}>•</CText>
            <CText style={styles.pointsText}>
              <CText style={styles.pointsValue}>{points}</CText>
              {' điểm'}
            </CText>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <QuickAction
          icon={
            <Image source={Images.qrcodeIcon} style={styles.actionIconImage} />
          }
          label="QR của tôi"
          onPress={onQrPress}
        />
        <QuickAction
          icon={<Sprout color={Colors.greenPrimary} size={22} strokeWidth={2} />}
          label="Thông tin vườn"
          onPress={onGardenInfoPress}
        />
      </View>
    </View>
  );
};

const QuickAction = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.actionItem,
      pressed && styles.actionItemPressed,
    ]}
  >
    <View style={styles.actionIconWrap}>{icon}</View>
    <CText style={styles.actionLabel}>{label}</CText>
  </Pressable>
);

export default memo(CustomerSummaryCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: scale(16),
    marginTop: scale(-36),
    borderRadius: scale(16),
    paddingVertical: scale(14),
    paddingHorizontal: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  avatarWrap: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: scale(10),
  },
  avatar: {
    width: scale(36),
    height: scale(36),
  },
  infoWrap: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  customerCode: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginTop: scale(2),
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(4),
    flexWrap: 'wrap',
  },
  memberText: {
    fontSize: fontScale(11),
    color: '#C58A00',
    fontFamily: Fonts.SEMIBOLD,
    marginLeft: scale(4),
  },
  dot: {
    marginHorizontal: scale(4),
    color: Colors.gray300,
    fontSize: fontScale(11),
  },
  pointsText: {
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
  pointsValue: {
    fontFamily: Fonts.BOLD,
    color: Colors.text,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: Colors.gray200,
    marginHorizontal: scale(8),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItem: {
    width: scale(72),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(4),
  },
  actionItemPressed: {
    opacity: 0.75,
  },
  actionIconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(6),
  },
  actionIconImage: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.greenPrimary,
  },
  actionLabel: {
    fontSize: fontScale(10),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
});
