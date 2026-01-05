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
export const hidePhoneNumber = (phoneNumber: string): string => {
  if (
    !phoneNumber ||
    typeof phoneNumber !== 'string' ||
    phoneNumber.length < 5
  ) {
    return phoneNumber;
  }
  const startLength = 3;
  const endLength = 2;
  const start = phoneNumber.substring(0, startLength);
  const end = phoneNumber.substring(phoneNumber.length - endLength);
  const hiddenLength = phoneNumber.length - startLength - endLength;
  const hiddenPart = '*'.repeat(hiddenLength);
  return `${start}${hiddenPart}${end}`;
};
export const formatCurrency = (
  amount: number | string | null | undefined,
  style: 'currency' | 'decimal' = 'currency',
  currency: string = 'VND',
  locale: string = 'vi-VN',
): string => {
  if (
    amount === null ||
    amount === undefined ||
    amount === '' ||
    Number(amount) === 0
  ) {
    return style === 'currency' ? `0 ${currency}` : '0';
  }
  const num = Number(amount);
  const options: Intl.NumberFormatOptions = {
    style: style,
    currency: style === 'currency' ? currency : undefined,
    minimumFractionDigits: style === 'currency' ? 0 : 0,
    maximumFractionDigits: style === 'currency' ? 0 : 2,
  };
  try {
    return new Intl.NumberFormat(locale, options).format(num);
  } catch (error) {
    console.error('Lỗi định dạng tiền tệ:', error);

    return num.toString();
  }
};

  export function formatISODate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return 'Ngày không hợp lệ';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
