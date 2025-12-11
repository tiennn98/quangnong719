import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './auth-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import {navigationRef} from './navigation-service';

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
