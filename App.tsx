
if (__DEV__) {
  require('./src/services/reactotron-config');
}

import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalLoading, { globalLoadingRef } from '@/components/global-loading';
import Navigators from '@/navigators';
import { persistor, store } from '@/redux/store';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/react-query-client';



if (Text.defaultProps == null) {Text.defaultProps = {};}
if (TextInput.defaultProps == null) {TextInput.defaultProps = {};}
if (TouchableOpacity.defaultProps == null) {TouchableOpacity.defaultProps = {};}
if (Pressable.defaultProps == null) {Pressable.defaultProps = {};}

Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
TouchableOpacity.defaultProps.allowFontScaling = false;
Pressable.defaultProps.allowFontScaling = false;

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalLoading ref={globalLoadingRef} />
            <Navigators />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;

