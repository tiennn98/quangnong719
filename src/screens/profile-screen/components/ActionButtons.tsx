// src/components/ActionButtons.tsx

import CText from '@/components/text';
import { logout } from '@/redux/slices/authSlice';
import { Colors } from '@/themes';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface ActionButtonProps {
  iconName: string;
  title: string;
  subtitle: string;
  isLogout?: boolean;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  title,
  subtitle,
  isLogout = false,
  onPress,
}) => {
  const iconColor = isLogout ? Colors.red : Colors.greenPrimary;
  const iconBackground = isLogout ? `${Colors.red}10` : `${Colors.greenPrimary}10`; // Màu nền nhạt hơn 10%

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        {/* <MaterialCommunityIcons name={iconName} size={24} color={iconColor} /> */}
      </View>
      <View style={styles.textContainer}>
        <CText style={[styles.title, isLogout && { color: Colors.red }]}>{title}</CText>
        <CText style={styles.subtitle}>{subtitle}</CText>
      </View>
      {/* <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.lightText} /> */}
    </TouchableOpacity>
  );
};

const ActionButtons: React.FC = () => {
    const dispatch = useDispatch();
  const handleShowQR = () => console.log('Hiển thị mã QR');
  const handleSettings = () => console.log('Cài đặt ứng dụng');
  const handleLogout = () => dispatch(logout());

  return (
    <View style={styles.container}>
      <ActionButton
        iconName="qrcode-scan"
        title="Chinh sửa thông tin cá nhân"
        subtitle="Chinh sửa thông tin cá nhân"
        onPress={handleShowQR}
      />
      <ActionButton
        iconName="qrcode-scan"
        title="Mã khách hàng"
        subtitle="Hiển thị tại cửa hàng"
        onPress={handleShowQR}
      />
      <ActionButton
        iconName="cog"
        title="Cài đặt"
        subtitle="Tùy chọn ứng dụng"
        onPress={handleSettings}
      />
      <ActionButton
        iconName="logout"
        title="Đăng xuất"
        subtitle="Thoát khỏi tài khoản"
        isLogout
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: Colors.white, // Nếu muốn có nền trắng bao ngoài các nút
    borderRadius: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.h1,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.buttonbg,
  },
});

export default ActionButtons;
