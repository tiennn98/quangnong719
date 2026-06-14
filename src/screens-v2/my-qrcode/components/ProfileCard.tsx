import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Barcode,
  Crown,
  Diamond,
  Pencil,
  Phone,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { QrProfileData } from '../types';

type Props = {
  profile: QrProfileData;
  onEditAvatar?: () => void;
};

const ProfileCard: React.FC<Props> = ({ profile, onEditAvatar }) => (
  <View style={styles.card}>
    <Image
      source={Images.logowhite}
      style={styles.watermark}
      resizeMode="contain"
    />
    <View style={styles.overlayDark} />

    <View style={styles.content}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder} />
        <Pressable
          onPress={onEditAvatar}
          hitSlop={8}
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
          ]}
        >
          <Pencil color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
        </Pressable>
      </View>

      <View style={styles.infoSection}>
        <CText style={styles.name} numberOfLines={1}>
          {profile.fullName}
        </CText>

        <View style={styles.infoRow}>
          <Phone color={Colors.white} size={12} strokeWidth={2.2} />
          <CText style={styles.infoText}>{profile.phone}</CText>
        </View>

        <View style={styles.infoRow}>
          <Barcode color={Colors.white} size={12} strokeWidth={2.2} />
          <CText style={styles.infoText} numberOfLines={1}>
            Mã khách hàng: {profile.customerCode}
          </CText>
        </View>

        <View style={styles.badgesRow}>
          <View style={styles.memberBadge}>
            <Crown color="#E6A100" size={12} fill="#FFF3D0" />
            <CText style={styles.memberText}>{profile.memberLabel}</CText>
          </View>

          <View style={styles.pointsBadge}>
            <Diamond color={Colors.blue400} size={12} fill="#E8F4FC" />
            <CText style={styles.pointsText}>{profile.points} điểm</CText>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default memo(ProfileCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
    borderRadius: scale(16),
    backgroundColor: Colors.greenPrimary,
    overflow: 'hidden',
    minHeight: scale(130),
  },
  watermark: {
    position: 'absolute',
    right: scale(8),
    top: scale(8),
    width: scale(100),
    height: scale(100),
    opacity: 0.12,
  },
  overlayDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    gap: scale(12),
  },
  avatarSection: {
    position: 'relative',
    width: scale(76),
    height: scale(76),
    flexShrink: 0,
  },
  avatarPlaceholder: {
    width: scale(76),
    height: scale(76),
    borderRadius: scale(38),
    backgroundColor: 'red',
    borderWidth: scale(3),
    borderColor: Colors.white,
  },
  editButton: {
    position: 'absolute',
    right: -scale(2),
    bottom: scale(2),
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  pressed: {
    opacity: 0.85,
  },
  infoSection: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: fontScale(16),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(6),
  },
  infoText: {
    flex: 1,
    fontSize: fontScale(11),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: Fonts.MEDIUM,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: scale(10),
    flexWrap: 'wrap',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E6A100',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  memberText: {
    fontSize: fontScale(10),
    color: '#E6A100',
    fontFamily: Fonts.SEMIBOLD,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  pointsText: {
    fontSize: fontScale(10),
    color: Colors.white,
    fontFamily: Fonts.SEMIBOLD,
  },
});
