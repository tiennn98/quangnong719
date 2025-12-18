import CText from '@/components/text';
import { SCREEN_NAME } from '@/constants';
import { navigate } from '@/navigators';
import { hardLogout } from '@/services/auth.api';
import { Colors } from '@/themes';
import {
  ChevronRight,
  LogOut,
  Settings,
  User,
} from 'lucide-react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type IconKey = 'profile' | 'settings' | 'logout';

interface ActionButtonProps {
  iconKey: IconKey;
  title: string;
  subtitle: string;
  isLogout?: boolean;
  onPress: () => void;
  isLast?: boolean;
}

const ICON_MAP: Record<IconKey, React.ComponentType<any>> = {
  profile: User,
  settings: Settings,
  logout: LogOut,
};

const ActionButton: React.FC<ActionButtonProps> = memo(
  ({iconKey, title, subtitle, isLogout = false, onPress, isLast}) => {
    const Icon = ICON_MAP[iconKey];
    const iconColor = isLogout ? Colors.red : Colors.greenPrimary;
    const iconBg = isLogout ? 'rgba(255,0,0,0.08)' : 'rgba(11,43,30,0.08)';

    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.row,
          pressed && styles.rowPressed,
          !isLast && styles.rowDivider,
        ]}>
        <View style={[styles.iconWrap, {backgroundColor: iconBg}]}>
          <Icon size={20} color={iconColor} />
        </View>

        <View style={styles.textWrap}>
          <CText style={[styles.title, isLogout && {color: Colors.red}]}>
            {title}
          </CText>
          <CText style={styles.subtitle}>{subtitle}</CText>
        </View>

        <ChevronRight size={18} color={'rgba(0,0,0,0.35)'} />
      </Pressable>
    );
  },
);

const ActionButtons: React.FC = () => {


  const handleEditProfile = useCallback(() => {
    return navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN);
  }, []);

  const handleSettings = useCallback(() => {
    // TODO: navigate(SCREEN_NAME.SETTINGS)
  }, []);

  const items = useMemo(
    () => [
      {
        iconKey: 'profile' as const,
        title: 'Chỉnh sửa thông tin cá nhân',
        subtitle: 'Cập nhật họ tên, địa chỉ, cây trồng…',
        onPress: handleEditProfile,
      },
      {
        iconKey: 'settings' as const,
        title: 'Cài đặt',
        subtitle: 'Tùy chọn ứng dụng',
        onPress: handleSettings,
      },
      {
        iconKey: 'logout' as const,
        title: 'Đăng xuất',
        subtitle: 'Thoát khỏi tài khoản',
        isLogout: true,
        onPress: hardLogout(),
      },
    ],
    [handleEditProfile, handleSettings],
  );

  return (
    <View style={styles.card}>
      {items.map((it, idx) => (
        <ActionButton
          key={it.iconKey}
          {...it}
          isLast={idx === items.length - 1}
        />
      ))}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    paddingHorizontal: scale(14),
  },
  rowPressed: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  iconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  textWrap: {flex: 1},
  title: {
    fontSize: fontScale(15),
    fontWeight: '700',
    color: Colors.h1,
  },
  subtitle: {
    marginTop: scale(2),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.55)',
  },
});
