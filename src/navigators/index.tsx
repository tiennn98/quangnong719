import { useAppSelector } from '@/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStackNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import { navigationRef } from './navigation-service';

const Navigators = () => {
  const accessToken = useAppSelector(state => state.auth.accessToken);

  return (

      <NavigationContainer ref={navigationRef}>
        {accessToken ? <AppStackNavigator /> : <AuthNavigator />}
      </NavigationContainer>

  );
};

export default Navigators;
export { goBack, navigate, navigationRef, replace } from './navigation-service';
