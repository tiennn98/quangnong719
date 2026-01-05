import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Đã lưu trữ thành công: ${key}`);
  } catch (e) {
    console.error(`Lỗi khi lưu trữ ${key}:`, e);
  }
};
export const getAllStoredKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('--- Danh sách Keys trong AsyncStorage ---');
    console.log(keys);
    console.log('------------------------------------------');
    return keys;
  } catch (e) {
    console.error('Lỗi khi lấy danh sách keys từ AsyncStorage:', e);
    return [];
  }
};
