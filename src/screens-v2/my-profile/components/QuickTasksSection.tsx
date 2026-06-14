import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Bell,
  ClipboardList,
  Headphones,
  Pencil,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { QuickTaskId } from '../types';

const TASKS: {
  id: QuickTaskId;
  label: string;
  icon: typeof Pencil;
}[] = [
  { id: 'edit', label: 'Chỉnh sửa hồ sơ', icon: Pencil },
  { id: 'history', label: 'Xem lịch sử mua hàng', icon: ClipboardList },
  { id: 'notification', label: 'Cài đặt thông báo', icon: Bell },
  { id: 'support', label: 'Hỗ trợ kỹ sư', icon: Headphones },
];

type Props = {
  onPress?: (id: QuickTaskId) => void;
};

const QuickTasksSection: React.FC<Props> = ({ onPress }) => (
  <View style={styles.section}>
    <CText style={styles.title}>Tác vụ nhanh</CText>

    <View style={styles.grid}>
      {TASKS.map(task => {
        const Icon = task.icon;
        return (
          <Pressable
            key={task.id}
            onPress={() => onPress?.(task.id)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <Icon color={Colors.greenPrimary} size={18} strokeWidth={2.2} />
            <CText style={styles.label}>{task.label}</CText>
          </Pressable>
        );
      })}
    </View>
  </View>
);

export default memo(QuickTasksSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(16),
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    alignItems: 'center',
    gap: scale(8),
    minHeight: scale(88),
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    fontSize: fontScale(10),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    lineHeight: fontScale(14),
  },
});
