import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { NotificationTabId } from '../types';

const TABS: { id: NotificationTabId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'event', label: 'Sự kiện' },
  { id: 'debt', label: 'Công nợ' },
  { id: 'invoice', label: 'Hóa đơn' },
];

type Props = {
  activeId: NotificationTabId;
  onChange: (id: NotificationTabId) => void;
};

const NotificationFilterTabs: React.FC<Props> = ({ activeId, onChange }) => (
  <View style={styles.row}>
    {TABS.map(tab => {
      const active = tab.id === activeId;

      return (
        <Pressable
          key={tab.id}
          onPress={() => onChange(tab.id)}
          style={({ pressed }) => [
            styles.tab,
            active ? styles.tabActive : styles.tabInactive,
            pressed && styles.pressed,
          ]}
        >
          <CText style={[styles.tabLabel, active && styles.tabLabelActive]}>
            {tab.label}
          </CText>
        </Pressable>
      );
    })}
  </View>
);

export default memo(NotificationFilterTabs);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: scale(14),
    paddingBottom: scale(12),
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginTop: -scale(12),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    borderRadius: scale(18),
    marginHorizontal: scale(2),
  },
  tabActive: {
    backgroundColor: Colors.greenPrimary,
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.88,
  },
  tabLabel: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.SEMIBOLD,
  },
  tabLabelActive: {
    color: Colors.white,
  },
});
