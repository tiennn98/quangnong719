import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import {navigationRef} from './navigation-service';
import BottomTabNavigator from './bottom-tab-navigator';

const Navigators = () => {
  const auth = true;

  return (
    <NavigationContainer ref={navigationRef}>
      {auth ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigators;

export {goBack, navigate, navigationRef, replace} from './navigation-service';
