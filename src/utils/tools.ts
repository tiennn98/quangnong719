import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking} from 'react-native';

export const openLink = async (url: string) => {
  const isSupportUrl = await Linking.canOpenURL(url);
  if (isSupportUrl) {
    Linking.openURL(url);
  } else {
    showAlertMessage({
      message: 'Đường dẫn không hỗ trợ',
    });
  }
};
export const showAlertMessage = ({message}: {message: string}) => {
  Alert.alert('Thông báo', message);
};

export function formatToVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export const setItem = async (name: string, params: any) =>
  await AsyncStorage.setItem(name, JSON.stringify(params));

export const getItem = async (name: any) => {
  const result = await AsyncStorage.getItem(name);
  return JSON.parse(result || '');
};
