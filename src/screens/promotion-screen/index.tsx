import { CText, TabView } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';

import { SCREEN_NAME } from '@/constants';
import { useGetProfile } from '@/hooks/useProfile';
import { useGetVoucherList } from '@/hooks/useVoucher';
import { navigate } from '@/navigators';
import type { VoucherItemDTO } from '@/services/voucher.api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { groupVouchers } from './helper';
import ActiveTabScreen from './tab/active-tab';
import ExpiredTabScreen from './tab/expired-tab';
import UsedTabScreen from './tab/used-tab';

const PromotionScreen = () => {
  const insets = useSafeAreaInsets();
  const voucherQ = useGetVoucherList(1, 10);
  const items = (voucherQ.data?.data?.items || []) as VoucherItemDTO[];

  const grouped = useMemo(() => groupVouchers(items), [items]);

  const tabs = useMemo(
    () => [
      {key: 'active', title: `Đang hoạt động (${grouped.active.length})`},
      {key: 'used', title: `Đã dùng (${grouped.used.length})`},
      {key: 'expired', title: `Hết hạn (${grouped.expired.length})`},
    ],
    [grouped.active.length, grouped.used.length, grouped.expired.length],
  );

  const {data: profile} = useGetProfile() as any;
  const phoneNumber = profile?.phone_number || '';

  const onPressUse = useCallback(
    (voucher: VoucherItemDTO) => {
      navigate(SCREEN_NAME.VOUCHER_USE_SCREEN, {
        voucher,
        phoneNumber,
      });
    },
    [phoneNumber],
  );

  const renderScene = useCallback(
    ({route}: any) => {
      if (route.key === 'active') {
        return (
          <ActiveTabScreen
            items={grouped.active as any}
            isLoading={voucherQ.isLoading}
            onPressUse={onPressUse}
          />
        );
      }

      if (route.key === 'used') {
        return (
          <UsedTabScreen
            items={grouped.used as any}
            isLoading={voucherQ.isLoading}
          />
        );
      }

      return (
        <ExpiredTabScreen
          items={grouped.expired as any}
          isLoading={voucherQ.isLoading}
        />
      );
    },
    [
      grouped.active,
      grouped.used,
      grouped.expired,
      voucherQ.isLoading,
      onPressUse,
    ],
  );

  const Header = useMemo(() => {
    const activeCount = grouped.active.length;
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
            {voucherQ.isLoading
              ? 'Đang tải…'
              : `${activeCount} mã đang hoạt động`}
          </CText>
        </View>
      </View>
    );
  }, [
    grouped.active.length,
    voucherQ.isLoading,
    voucherQ.isError,
    voucherQ.error,
  ]);

  return (
    <View
      style={[
        styles.safe,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.container}>
        {Header}

        <TabView
          tabBarContainerStyle={styles.tabBar}
          renderScene={renderScene}
          data={tabs}
        />
      </View>
    </View>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.primary},
  container: {flex: 1, paddingHorizontal: scale(16), paddingTop: scale(16)},
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
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
