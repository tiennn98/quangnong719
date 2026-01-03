import {CText, TabView} from '@/components';
import {Colors, Fonts} from '@/themes';
import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {scale} from 'react-native-utils-scale';

import ActiveTabScreen from './tab/active-tab';
import ExpiredTabScreen from './tab/expired-tab';
import UsedTabScreen from './tab/used-tab';

import {useGetVoucherListInfinite} from '@/hooks/useVoucher';
import {groupVouchers} from './helper';
import {navigate} from '@/navigators';
import {SCREEN_NAME} from '@/constants';
import {useGetProfile} from '@/hooks/useProfile';

const PromotionScreen = () => {
  const {data: profile} = useGetProfile();
  
  // ✅ IMPORTANT: home phải được call trước để “kích hoạt” voucher
  // => đảm bảo HomeScreen đã call /customer/home trước khi vào Promotion
  
  const voucherQ = useGetVoucherListInfinite(10);
  
  const items = useMemo(() => {
    const pages = voucherQ.data?.pages || [];
    return pages.flatMap(p => p?.data?.items || []);
  }, [voucherQ.data]);
  
  const grouped = useMemo(() => groupVouchers(items), [items]);
  
  const tabs = useMemo(
    () => [
      {key: 'active', title: `Đang hoạt động (${grouped.active.length})`},
      {key: 'used', title: `Đã dùng (${grouped.used.length})`},
      {key: 'expired', title: `Hết hạn (${grouped.expired.length})`},
    ],
    [grouped.active.length, grouped.used.length, grouped.expired.length],
  );
  
  const onRefresh = useCallback(async () => {
    await voucherQ.refetch();
  }, [voucherQ]);
  
  const onLoadMore = useCallback(() => {
    if (voucherQ.hasNextPage && !voucherQ.isFetchingNextPage) {
      voucherQ.fetchNextPage();
    }
  }, [voucherQ.hasNextPage, voucherQ.isFetchingNextPage, voucherQ.fetchNextPage]);
  
  const onPressUse = useCallback(
    (voucher: any) => {
      navigate(SCREEN_NAME.VOUCHER_USE_SCREEN, {
        voucher,
        phoneNumber: profile?.phone_number || '',
      });
    },
    [profile?.phone_number],
  );
  
  const TabActive = useCallback(
    () => (
      <ActiveTabScreen
        items={grouped.active}
        refreshing={voucherQ.isRefetching}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        isFetchingNextPage={voucherQ.isFetchingNextPage}
        hasNextPage={!!voucherQ.hasNextPage}
        onPressUse={onPressUse}
      />
    ),
    [
      grouped.active,
      voucherQ.isRefetching,
      voucherQ.isFetchingNextPage,
      voucherQ.hasNextPage,
      onRefresh,
      onLoadMore,
      onPressUse,
    ],
  );
  
  const TabUsed = useCallback(
    () => (
      <UsedTabScreen
        items={grouped.used}
        refreshing={voucherQ.isRefetching}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        isFetchingNextPage={voucherQ.isFetchingNextPage}
        hasNextPage={!!voucherQ.hasNextPage}
        onPressUse={onPressUse}
      />
    ),
    [
      grouped.used,
      voucherQ.isRefetching,
      voucherQ.isFetchingNextPage,
      voucherQ.hasNextPage,
      onRefresh,
      onLoadMore,
      onPressUse,
    ],
  );
  
  const TabExpired = useCallback(
    () => (
      <ExpiredTabScreen
        items={grouped.expired}
        refreshing={voucherQ.isRefetching}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        isFetchingNextPage={voucherQ.isFetchingNextPage}
        hasNextPage={!!voucherQ.hasNextPage}
      />
    ),
    [
      grouped.expired,
      voucherQ.isRefetching,
      voucherQ.isFetchingNextPage,
      voucherQ.hasNextPage,
      onRefresh,
      onLoadMore,
    ],
  );
  
  const renderScene: any = useMemo(
    () =>
      SceneMap({
        active: TabActive,
        used: TabUsed,
        expired: TabExpired,
      }),
    [TabActive, TabUsed, TabExpired],
  );
  
  const _renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.headerLeft}>
          <CText fontFamily={Fonts.BOLD} color={Colors.greenPrimary} fontSize={24}>
            Voucher của tôi
          </CText>
          <CText fontFamily={Fonts.REGULAR} color={Colors.greenPrimary} fontSize={14}>
            Quản lý và sử dụng các mã ưu đãi của bạn
          </CText>
          
          {voucherQ.isError ? (
            <CText style={{marginTop: scale(6)}} color="#EF4444" fontSize={12}>
              {(voucherQ.error as any)?.message || 'Không tải được voucher'}
            </CText>
          ) : null}
        </View>
        
        <View style={styles.headerRight}>
          <CText
            align="center"
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={12}>
            {voucherQ.isLoading ? 'Đang tải…' : `${grouped.active.length} mã đang hoạt động`}
          </CText>
        </View>
      </View>
    );
  }, [grouped.active.length, voucherQ.isError, voucherQ.isLoading, voucherQ.error]);
  
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
  safe: {flex: 1, backgroundColor: Colors.primary},
  container: {flex: 1, paddingHorizontal: scale(16), paddingVertical: scale(16)},
  viewHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: scale(16)},
  headerLeft: {paddingRight: scale(16), flex: 1},
  headerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: scale(16),
    padding: scale(12),
    minWidth: scale(120),
  },
  tabBar: {marginBottom: scale(12)},
});
