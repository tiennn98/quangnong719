import {CText, TabView} from '@/components';
import {Colors, Fonts} from '@/themes';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {scale} from 'react-native-utils-scale';
import ActiveTabScreen from './tab/active-tab';
import ExpiredTabScreen from './tab/expired-tab';
import UsedTabScreen from './tab/used-tab';

const tabs = [
  {key: 'active', title: 'Đang hoạt động (2)'},
  {key: 'used', title: 'Đã dùng (1)'},
  {key: 'expired', title: 'Hết hạn (10)'},
];

const TabActive = () => <ActiveTabScreen />;
const TabUsed = () => <UsedTabScreen />;
const TabExpired = () => <ExpiredTabScreen />;

const PromotionScreen = () => {
  const _renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.headerLeft}>
          <CText
            fontFamily={Fonts.BOLD}
            color={Colors.greenPrimary}
            fontSize={24}>
            Voucher của tôi
          </CText>
          <CText
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={14}>
            Quản lý và sử dụng các mã ưu đãi của bạn
          </CText>
        </View>
        <View style={styles.headerRight}>
          <CText
            align="center"
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={12}>
            2 mã đang hoạt động
          </CText>
        </View>
      </View>
    );
  }, []);

  const renderScene: any = SceneMap({
    active: TabActive,
    used: TabUsed,
    expired: TabExpired,
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {_renderHeader()}
        <TabView
          tabBarContainerStyle={styles.tabBar}
          renderScene={renderScene}
          data={tabs}
        />
      </View>
    </SafeAreaView>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  headerLeft: {
    paddingRight: scale(16),
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: scale(16),
    padding: scale(12),
  },
  tabBar: {
    marginBottom: scale(12),
  },
});
