import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CircleCheck, Clock3, TicketPercent } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherTabId } from '../types';

type TabConfig = {
  id: VoucherTabId;
  label: string;
  icon: typeof TicketPercent;
};

const TABS: TabConfig[] = [
  { id: 'active', label: 'Đang hoạt động', icon: TicketPercent },
  { id: 'expiring', label: 'Sắp hết hạn', icon: Clock3 },
  { id: 'used', label: 'Đã dùng', icon: CircleCheck },
];

type Props = {
  activeId: VoucherTabId;
  onChange: (id: VoucherTabId) => void;
};

const VoucherFilterTabs: React.FC<Props> = ({ activeId, onChange }) => (
  <View style={styles.row}>
    {TABS.map(tab => {
      const active = tab.id === activeId;
      const Icon = tab.icon;
      const iconColor = active
        ? Colors.greenPrimary
        : tab.id === 'expiring'
          ? '#D97706'
          : Colors.gray500;

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
          <Icon color={iconColor} size={14} strokeWidth={2.2} />
          <CText style={[styles.tabLabel, active && styles.tabLabelActive]}>
            {tab.label}
          </CText>
        </Pressable>
      );
    })}
  </View>
);

export default memo(VoucherFilterTabs);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: scale(8),
    paddingHorizontal: scale(16),
    marginBottom: scale(14),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(6),
    borderRadius: scale(20),
  },
  tabActive: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.greenPrimary,
  },
  tabInactive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  pressed: {
    opacity: 0.88,
  },
  tabLabel: {
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.SEMIBOLD,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: Colors.greenPrimary,
  },
});
