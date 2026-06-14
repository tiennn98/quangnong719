import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ShieldCheck } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { USAGE_INFO_ITEMS } from '../data';
import { UsageInfoItemData } from '../types';
import UsageInfoItem from './UsageInfoItem';

type Props = {
  onItemPress?: (item: UsageInfoItemData) => void;
};

const UsageInfoList: React.FC<Props> = ({ onItemPress }) => (
  <View style={styles.wrapper}>
    <CText style={styles.sectionTitle}>Sử dụng mã QR để</CText>

    <View style={styles.card}>
      {USAGE_INFO_ITEMS.map((item, index) => (
        <UsageInfoItem
          key={item.id}
          item={item}
          isLast={index === USAGE_INFO_ITEMS.length - 1}
          onPress={onItemPress}
        />
      ))}
    </View>

    <View style={styles.footer}>
      <ShieldCheck color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
      <CText style={styles.footerText}>
        Mã QR của bạn được bảo mật và chỉ dùng cho tài khoản này.
      </CText>
    </View>
  </View>
);

export default memo(UsageInfoList);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(18),
    paddingHorizontal: scale(16),
  },
  sectionTitle: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(6),
    marginTop: scale(14),
    paddingHorizontal: scale(4),
  },
  footerText: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(15),
  },
});
