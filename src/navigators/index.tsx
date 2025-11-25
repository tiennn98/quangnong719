import {SCREEN_NAME} from '@/constants';
import {useAppSelector} from '@/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppScreen} from './app-navigator/app-screen';
import AuthStackNavigator from './auth-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import {navigationRef} from './navigation-service';

const Stack = createNativeStackNavigator();
const Navigators = () => {
  const auth = useAppSelector(state => state.user.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={auth ? SCREEN_NAME.APP_STACK : SCREEN_NAME.AUTH_STACK}
          component={auth ? MainTabNavigator : AuthNavigator}
        />
        {Object.entries({
          ...AppScreen,
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} key={name} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
export {goBack, navigate, navigationRef, replace} from './navigation-service';

const MainTabNavigator = React.memo(() => {
  return <BottomTabNavigator />;
});

const AuthNavigator = React.memo(() => {
  return <AuthStackNavigator />;
});
