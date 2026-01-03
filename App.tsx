import ProfileUpdateReminderGate from '@/screens/ProfileUpdateReminderGate';

if (__DEV__) {
  require('./src/services/reactotron-config');
}

import GlobalLoading, { globalLoadingRef } from '@/components/global-loading';
import Navigators from '@/navigators';
import { persistor, store } from '@/redux/store';
import { Colors } from '@/themes';
import CodePush from '@revopush/react-native-code-push';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { queryClient } from './src/services/react-query-client';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
if (TouchableOpacity.defaultProps == null) {
  TouchableOpacity.defaultProps = {};
}
if (Pressable.defaultProps == null) {
  Pressable.defaultProps = {};
}

Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
TouchableOpacity.defaultProps.allowFontScaling = false;
Pressable.defaultProps.allowFontScaling = false;

const UpdatingUI = ({progress}) => {
  return (
    <View style={styles.updateContainer}>
      <StatusBar barStyle="default" />
      <ActivityIndicator size="large" color={Colors.greenPrimary} />
      <Text style={styles.updateTitle}>Đang cập nhật ứng dụng...</Text>
      <Text style={styles.updateText}>{progress}%</Text>
    </View>
  );
};

const App = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const syncCodePush = () => {
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        status => {
          switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              console.log('Đang kiểm tra bản cập nhật...');
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              console.log('Đang tải bản cập nhật...');
              setIsUpdating(true); // Hiện UI cập nhật
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              console.log('Đang cài đặt...');
              // Đang cài đặt, vẫn giữ UI cập nhật
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              console.log('Đã cài đặt xong, chuẩn bị restart.');
              // CodePush sẽ tự động restart app ở đây nhờ chế độ IMMEDIATE
              setIsUpdating(false);
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              console.log('App đã là bản mới nhất.');
              setIsUpdating(false);
              break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
              console.log('Lỗi cập nhật.');
              setIsUpdating(false);
              break;
          }
        },
        ({receivedBytes, totalBytes}) => {
          const currentProgress = Math.round(
            (receivedBytes / totalBytes) * 100,
          );
          setProgress(currentProgress);
        },
      );
    };

    syncCodePush();
  }, []);

  if (isUpdating) {
    return <UpdatingUI progress={progress} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalLoading ref={globalLoadingRef} />
            <ProfileUpdateReminderGate>
              <Navigators />
            </ProfileUpdateReminderGate>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Style cho màn hình cập nhật
  updateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Nền trắng đè lên toàn bộ app
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  updateTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  updateText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

