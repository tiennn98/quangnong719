import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Clock3,
  Gift,
  MapPin,
  Navigation,
  Users,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  startTime: string;
  fullLocation: string;
  seatsRemaining: number;
  seatsTotal: number;
  giftsSummary: string;
  onDirectionsPress?: () => void;
};

const EventInfoCard: React.FC<Props> = ({
  startTime,
  fullLocation,
  seatsRemaining,
  seatsTotal,
  giftsSummary,
  onDirectionsPress,
}) => (
  <View style={styles.card}>
    <View style={styles.left}>
      <InfoRow
        icon={<Clock3 color={Colors.greenPrimary} size={14} strokeWidth={2.2} />}
        label="Thời gian bắt đầu"
        value={startTime}
      />
      <InfoRow
        icon={<MapPin color={Colors.greenPrimary} size={14} strokeWidth={2.2} />}
        label="Địa điểm"
        value={fullLocation}
      />
      <InfoRow
        icon={<Users color={Colors.greenPrimary} size={14} strokeWidth={2.2} />}
        label="Số chỗ còn lại"
        value={
          <CText style={styles.seatsValue}>
            <CText style={styles.seatsHighlight}>{seatsRemaining}</CText>
            /{seatsTotal} chỗ
          </CText>
        }
      />
      <InfoRow
        icon={<Gift color={Colors.greenPrimary} size={14} strokeWidth={2.2} />}
        label="Ưu đãi & quà tặng"
        value={giftsSummary}
      />
    </View>

    <View style={styles.mapWrap}>
      <View style={styles.mapPlaceholder} />
      <Pressable
        onPress={onDirectionsPress}
        style={({ pressed }) => [
          styles.directionsButton,
          pressed && styles.pressed,
        ]}
      >
        <Navigation color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
        <CText style={styles.directionsText}>Xem đường đi</CText>
      </Pressable>
    </View>
  </View>
);

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <View style={styles.infoRow}>
    <View style={styles.iconWrap}>{icon}</View>
    <View style={styles.infoContent}>
      <CText style={styles.infoLabel}>{label}</CText>
      {typeof value === 'string' ? (
        <CText style={styles.infoValue}>{value}</CText>
      ) : (
        value
      )}
    </View>
  </View>
);

export default memo(EventInfoCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    gap: scale(10),
  },
  left: {
    flex: 1,
    minWidth: 0,
    gap: scale(10),
  },
  infoRow: {
    flexDirection: 'row',
    gap: scale(8),
  },
  iconWrap: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  infoValue: {
    marginTop: scale(2),
    fontSize: fontScale(10),
    color: Colors.text,
    fontFamily: Fonts.SEMIBOLD,
    lineHeight: fontScale(14),
  },
  seatsValue: {
    marginTop: scale(2),
    fontSize: fontScale(10),
    color: Colors.text,
    fontFamily: Fonts.SEMIBOLD,
  },
  seatsHighlight: {
    fontSize: fontScale(12),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
  mapWrap: {
    width: scale(100),
    alignSelf: 'stretch',
    borderRadius: scale(12),
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
  },
  mapPlaceholder: {
    flex: 1,
    minHeight: scale(120),
    backgroundColor: 'red',
  },
  directionsButton: {
    position: 'absolute',
    left: scale(6),
    right: scale(6),
    bottom: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    paddingVertical: scale(6),
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  pressed: {
    opacity: 0.88,
  },
  directionsText: {
    fontSize: fontScale(8),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
