import { CText } from '@/components';
import { Colors } from '@/themes';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';

interface QuickAccessProps {
  icon: any;
  label: string;
  /** Compact FAB (~50×50): icon trên, chữ nhỏ dưới */
  compact?: boolean;
}

export const QuickAccessBox: React.FC<QuickAccessProps> = React.memo(
  ({ icon, label, compact }) => (
    <TouchableOpacity
      style={[styles.quickAccessBox, compact && styles.quickAccessBoxCompact]}
      activeOpacity={0.8}
    >
      <View
        style={[styles.iconCircle, compact && styles.iconCircleCompact]}
      >
        <Image
          source={icon}
          style={[styles.iconImage, compact && styles.iconImageCompact]}
        />
      </View>
      <CText
        style={[styles.quickAccessLabel, compact && styles.quickAccessLabelCompact]}
        numberOfLines={2}
      >
        {label}
      </CText>
    </TouchableOpacity>
  ),
);

const styles = StyleSheet.create({
  quickAccessBox: {
    width: width / 2 - scale(30),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(120),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickAccessBoxCompact: {
    width: scale(50),
    height: scale(50),
    paddingVertical: scale(3),
    paddingHorizontal: scale(2),
    borderRadius: scale(10),
    justifyContent: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  iconImage: {
    width: scale(30),
    height: scale(30),
  },
  iconImageCompact: {
    width: scale(18),
    height: scale(18),
  },
  iconCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    backgroundColor: Colors.backgroundInput,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleCompact: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(6),
  },
  quickAccessLabel: {
    fontSize: fontScale(14),
    fontWeight: '600',
    color: Colors.h2,
    marginTop: scale(10),
  },
  quickAccessLabelCompact: {
    fontSize: fontScale(8),
    fontWeight: '600',
    marginTop: scale(2),
    textAlign: 'center',
    lineHeight: fontScale(9),
  },
});
