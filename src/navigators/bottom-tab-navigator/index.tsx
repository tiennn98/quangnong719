import { CText } from '@/components';
import { SCREEN_NAME } from '@/constants';
import { AboutStoreScreen, HomeScreen, ProfileScreen, PromotionScreen, WellcomeScreen } from '@/screens';
import InvoiceScreen from '@/screens/invoice-screen';
import { Colors, Fonts } from '@/themes';
import {
  House,
  NotepadText,
  Store,
  TicketPercent,
  UserRound,
} from 'lucide-react-native';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { width } from 'react-native-utils-scale';
import { navigate as MoveTo } from '../navigation-service';

const BottomTabNavigator = () => {
  const _renderIcon = (routeName: string, _selectedTab: string) => {
    switch (routeName) {
      case SCREEN_NAME.HOME:
        return <House color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.PROMOTION:
        return <TicketPercent color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.INVOICESCREEN:
        return <NotepadText color={Colors.greenPrimary} size={22} />;
      case SCREEN_NAME.PROFILESCREEN:
        return <UserRound color={Colors.greenPrimary} size={22} />;
    }
  };

  const _renderName = (routeName: string, selectedTab: string) => {
    let name = '';
    switch (routeName) {
      case SCREEN_NAME.HOME:
        name = 'Trang chủ';
        break;
      case SCREEN_NAME.PROMOTION:
        name = 'Khuyến mãi';
        break;
      case SCREEN_NAME.INVOICESCREEN:
        name = 'Hoá đơn';
        break;
      case SCREEN_NAME.PROFILESCREEN:
        name = 'Cá nhân';
        break;
    }
    return (
      <CText
        color={Colors.greenPrimary}
        fontSize={11}
        fontFamily={routeName === selectedTab ? Fonts.BOLD : Fonts.MEDIUM}>
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
      height={70}
      type={undefined}
      style={styles.bottomBar}
      bgColor="white"
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{headerShown: false}}
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => MoveTo(SCREEN_NAME.ABOUT_STORE_SCREEN)}>
            <Store color={Colors.greenPrimary} size={30} />
            <CText
              color={Colors.greenPrimary}
              fontSize={14}>
              {'Cửa Hàng'}
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
        name={SCREEN_NAME.PROMOTION}
        position="LEFT"
        component={() => <PromotionScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.ABOUT_STORE_SCREEN}
        position="CENTER"
        component={() => <AboutStoreScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.INVOICESCREEN}
        position="RIGHT"
        component={() => <InvoiceScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCREEN_NAME.PROFILESCREEN}
        position="RIGHT"
        component={() => <ProfileScreen />}
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
    textAlign: 'center',
  },
});
