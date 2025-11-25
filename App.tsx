if (__DEV__) {
  require('./src/services/reactotron-config');
}
import GlobalLoading, {globalLoadingRef} from '@/components/global-loading';
import Navigators from '@/navigators';
import {persistor, store} from '@/redux/store';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalLoading ref={globalLoadingRef} />
          <Navigators />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
