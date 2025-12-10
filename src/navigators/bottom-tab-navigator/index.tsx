import {SCREEN_NAME} from '@/constants';
import {HomeScreen} from '@/screens';
import {Colors} from '@/themes';
import {MapPinned} from 'lucide-react-native';
import React from 'react';
import {Animated, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {scale} from 'react-native-utils-scale';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTabNavigator = () => {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';
    switch (routeName) {
      case SCREEN_NAME.HOME:
        icon = 'home-outline';
        break;
      // case SCREEN_NAME.LIST_NEWS:
      //   icon = 'newspaper-outline';
      //   break;
      // case SCREEN_NAME.TAB_RANKINGS:
      //   icon = 'stats-chart';
      //   break;
      // case SCREEN_NAME.PROFILE:
      //   icon = 'person-outline';
      //   break;
    }
    return (
      <Ionicons
        name={icon}
        size={scale(24)}
        color={routeName === selectedTab ? Colors.primary : Colors.gray100}
      />
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const openMap = () => {
    const url =
      'https://www.google.com/maps/place/Th%C3%A0nh+L%E1%BB%A3i+Building+%C4%90%C3%A0+N%E1%BA%B5ng/@16.0593587,108.2088566,17z/data=!3m1!4b1!4m6!3m5!1s0x3142192d672dd473:0x6abd983cc7674ed8!8m2!3d16.0593587!4d108.2114315!16s%2Fg%2F11fhw_p1lx?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL('https://www.google.com/maps');
        }
      })
      .catch(err => console.error('Error opening map:', err));
  };

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName={SCREEN_NAME.HOME}
      borderTopLeftRight
      screenOptions={{headerShown: false}}
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity style={styles.button} onPress={openMap}>
            <MapPinned />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.HOME}
        position="LEFT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.SETTING}
        position="RIGHT"
        component={() => <HomeScreen />}
      />
    </CurvedBottomBar.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    bottom: scale(18),
  },
  imgCircle: {
    width: scale(30),
    height: scale(30),
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: scale(30),
    height: scale(30),
  },
  image: {
    width: scale(55),
    height: scale(55),
  },
});
