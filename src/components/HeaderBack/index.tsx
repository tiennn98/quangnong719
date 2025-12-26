import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import CText from '@/components/text';
import { goBack } from '@/navigators';
import { Colors, Fonts } from '@/themes';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

const HeaderBack: React.FC<Props> = ({title = '', onBack, right}) => {
  return (
    <View style={[styles.wrap]}>
      <View style={styles.row}>
        <Pressable
          onPress={onBack || goBack}
          hitSlop={12}
          android_ripple={{color: 'rgba(0,0,0,0.08)', borderless: true}}
          style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.greenPrimary} />
        </Pressable>

        <CText
          numberOfLines={1}
          fontFamily={Fonts.BOLD}
          fontSize={fontScale(24)}
          color={Colors.h1}
          style={styles.title}>
          {title}
        </CText>

        <View style={styles.right}>{right}</View>
      </View>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: scale(16),
    paddingTop: Platform.OS === 'ios' ? scale(16) : scale(12),
    paddingBottom: scale(8),
  },
  row: {
    height: scale(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios'
      ? {backgroundColor: 'rgba(0,0,0,0.04)'}
      : {}),
  },
  title: {
    flex: 1,
    marginLeft: scale(8),
  },
  right: {
    width: scale(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
