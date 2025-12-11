import {CText} from '@/components';
import {SCREEN_NAME} from '@/constants';
import {HomeScreen, PromotionScreen} from '@/screens';
import {Colors, Fonts} from '@/themes';
import {
  CalendarDays,
  House,
  NotepadText,
  TicketPercent,
  UserRound,
} from 'lucide-react-native';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {width} from 'react-native-utils-scale';
import {navigate as MoveTo} from '../navigation-service';

const BottomTabNavigator = () => {
  const _renderIcon = (routeName: string, _selectedTab: string) => {
    switch (routeName) {
      case SCREEN_NAME.HOME:
        return <House color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.CALENDAR:
        return <CalendarDays color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.INVOICE:
        return <NotepadText color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.PROFILE:
        return <UserRound color={Colors.greenPrimary} size={22} />;
    }
  };

  const _renderName = (routeName: string, selectedTab: string) => {
    let name = '';
    switch (routeName) {
      case SCREEN_NAME.HOME:
        name = 'Trang chủ';
        break;
      case SCREEN_NAME.CALENDAR:
        name = 'Lịch chăm sóc';
        break;
      case SCREEN_NAME.INVOICE:
        name = 'Hoá đơn';
        break;
      case SCREEN_NAME.PROFILE:
        name = 'Cá nhân';
        break;
    }
    return (
      <CText
        color={Colors.greenPrimary}
        fontSize={10}
        fontFamily={selectedTab ? Fonts.BOLD : Fonts.MEDIUM}>
        {name}
      </CText>
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
        {_renderName(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      height={55}
      type={undefined}
      style={styles.bottomBar}
      bgColor="white"
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{headerShown: false}}
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => MoveTo(SCREEN_NAME.PROMOTION)}>
            <TicketPercent color={Colors.greenPrimary} size={22} />
            <CText
              color={Colors.greenPrimary}
              fontSize={10}
              fontFamily={Fonts.BOLD}>
              {'Khuyến mãi'}
            </CText>
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
        name={SCREEN_NAME.CALENDAR}
        position="LEFT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.PROMOTION}
        position="CENTER"
        component={() => <PromotionScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.INVOICE}
        position="RIGHT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.PROFILE}
        position="RIGHT"
        component={() => <HomeScreen />}
      />
    </CurvedBottomBar.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
  },
  btnCircleUp: {
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
