/* eslint-disable react/no-unstable-nested-components */
import { CText } from '@/components';
import { SCREEN_NAME } from '@/constants';
import {
  HomeScreenV2,
  MyProfileScreen,
  NotificationScreen,
  PromotionScreen,
} from '@/screens-v2';
import { Colors, Fonts } from '@/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House,
  NotepadText,
  TicketPercent,
  UserRound,
} from 'lucide-react-native';
import React, { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TAB_ICON_SIZE = 22;
const TAB_LABEL_SIZE = 11;

const tabLabels: Record<string, string> = {
  [SCREEN_NAME.HOME]: 'Trang chủ',
  [SCREEN_NAME.PROMOTION]: 'Khuyến mãi',
  [SCREEN_NAME.ABOUT_STORE_SCREEN]: 'Lịch phun',
  [SCREEN_NAME.NOTIFICATION_SCREEN]: 'Thông báo',
  [SCREEN_NAME.PROFILESCREEN]: 'Tài khoản',
};

function TabIcon({ routeName }: { routeName: string }) {
  const color = Colors.greenPrimary;
  const size = TAB_ICON_SIZE;

  switch (routeName) {
    case SCREEN_NAME.HOME:
      return <House color={color} size={size} />;
    case SCREEN_NAME.PROMOTION:
      return <TicketPercent color={color} size={size} />;
    case SCREEN_NAME.NOTIFICATION_SCREEN:
      return <NotepadText color={color} size={size} />;
    case SCREEN_NAME.PROFILESCREEN:
      return <UserRound color={color} size={size} />;
    case SCREEN_NAME.ABOUT_STORE_SCREEN:
      return <NotepadText color={color} size={size} />;
    default:
      return null;
  }
}

const BottomTabsV2 = () => {
  const renderTabLabel = useCallback(
    ({
      focused,
      color,
      children,
    }: {
      focused: boolean;
      color: string;
      children: string;
    }) => (
      <CText
        color={color}
        fontSize={TAB_LABEL_SIZE}
        fontFamily={focused ? Fonts.BOLD : Fonts.MEDIUM}
        style={styles.tabLabel}
      >
        {children}
      </CText>
    ),
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.greenPrimary,
        tabBarInactiveTintColor: Colors.greenPrimary,
        tabBarHideOnKeyboard: Platform.OS === 'android',
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: () => <TabIcon routeName={route.name} />,
        tabBarLabel: renderTabLabel,
      })}
    >
      <Tab.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreenV2}
        options={{ tabBarLabel: tabLabels[SCREEN_NAME.HOME] }}
      />
      <Tab.Screen
        name={SCREEN_NAME.PROMOTION}
        component={PromotionScreen}
        options={{ tabBarLabel: tabLabels[SCREEN_NAME.PROMOTION] }}
      />
      {/* <Tab.Screen
        name={SCREEN_NAME.ABOUT_STORE_SCREEN}
        component={AboutStoreScreen}
        options={{
          tabBarLabel: tabLabels[SCREEN_NAME.ABOUT_STORE_SCREEN],
        }}
      /> */}
      <Tab.Screen
        name={SCREEN_NAME.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{ tabBarLabel: tabLabels[SCREEN_NAME.NOTIFICATION_SCREEN] }}
      />
      <Tab.Screen
        name={SCREEN_NAME.PROFILESCREEN}
        component={MyProfileScreen}
        options={{ tabBarLabel: tabLabels[SCREEN_NAME.PROFILESCREEN] }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsV2;

const styles = StyleSheet.create({
  tabItem: {
    paddingTop: 4,
  },
  tabLabel: {
    marginTop: 4,
    textAlign: 'center',
  },
});
