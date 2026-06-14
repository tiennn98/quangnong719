import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Barcode,
  Crown,
  Diamond,
  Pencil,
  Phone,
  Wallet,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  fullName: string;
  phone: string;
  customerCode: string;
  memberLabel: string;
  points: number;
  currentDebt: string;
  onEditPress?: () => void;
};

const ProfileHeroCard: React.FC<Props> = ({
  fullName,
  phone,
  customerCode,
  memberLabel,
  points,
  currentDebt,
  onEditPress,
}) => (
  <View style={styles.card}>
    <Image
      source={Images.logowhite}
      style={styles.watermark}
      resizeMode="contain"
    />
    <View style={styles.overlay} />

    <View style={styles.content}>
      <View style={styles.left}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder} />
          <Pressable
            onPress={onEditPress}
            hitSlop={8}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <Pencil color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
          </Pressable>
        </View>

        <View style={styles.info}>
          <CText style={styles.name} numberOfLines={1}>
            {fullName}
          </CText>

          <View style={styles.row}>
            <Phone color={Colors.white} size={11} strokeWidth={2.2} />
            <CText style={styles.rowText}>{phone}</CText>
          </View>

          <View style={styles.row}>
            <Barcode color={Colors.white} size={11} strokeWidth={2.2} />
            <CText style={styles.rowText} numberOfLines={1}>
              Mã khách hàng: {customerCode}
            </CText>
          </View>

          <View style={styles.badges}>
            <View style={styles.memberBadge}>
              <Crown color="#E6A100" size={10} fill="#FFF3D0" />
              <CText style={styles.memberText}>{memberLabel}</CText>
            </View>
            <View style={styles.pointsBadge}>
              <Diamond color={Colors.blue400} size={10} fill="#E8F4FC" />
              <CText style={styles.pointsText}>{points} điểm</CText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.debtSection}>
        <CText style={styles.debtLabel}>Công nợ hiện tại</CText>
        <CText style={styles.debtValue}>{currentDebt}</CText>
        <View style={styles.debtIcon}>
          <Wallet color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        </View>
      </View>
    </View>
  </View>
);

export default memo(ProfileHeroCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
    borderRadius: scale(16),
    backgroundColor: Colors.greenPrimary,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: scale(-10),
    top: scale(-10),
    width: scale(120),
    height: scale(120),
    opacity: 0.12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    gap: scale(10),
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    gap: scale(10),
    minWidth: 0,
  },
  avatarSection: {
    position: 'relative',
    width: scale(64),
    height: scale(64),
    flexShrink: 0,
  },
  avatarPlaceholder: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'red',
    borderWidth: scale(3),
    borderColor: Colors.white,
  },
  editButton: {
    position: 'absolute',
    right: -scale(2),
    bottom: scale(0),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: fontScale(15),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(5),
  },
  rowText: {
    flex: 1,
    fontSize: fontScale(9),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: Fonts.MEDIUM,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
    marginTop: scale(8),
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#E6A100',
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
  },
  memberText: {
    fontSize: fontScale(8),
    color: '#E6A100',
    fontFamily: Fonts.BOLD,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
  },
  pointsText: {
    fontSize: fontScale(8),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  debtSection: {
    width: scale(72),
    alignItems: 'center',
    flexShrink: 0,
  },
  debtLabel: {
    fontSize: fontScale(8),
    color: 'rgba(255,255,255,0.85)',
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
  debtValue: {
    marginTop: scale(4),
    fontSize: fontScale(12),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  debtIcon: {
    marginTop: scale(6),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
