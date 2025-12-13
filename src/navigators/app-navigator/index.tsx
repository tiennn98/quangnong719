import {SCREEN_NAME} from '@/constants';
import {AboutStoreScreen, HomeScreen, ProfileScreen} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREEN_NAME.PROFILESCREEN} component={ProfileScreen} />
      <Stack.Screen name={SCREEN_NAME.ABOUT_STORE_SCREEN} component={AboutStoreScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
