import { useGetVoucherList } from '@/hooks/useVoucher';
import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import VoucherList from './components/VoucherList';
import { ACTIVE_VOUCHER_COUNT } from './data';
import { VoucherItem, VoucherTabId } from './types';
import { navigate } from '@/navigators/navigation-service';
import { SCREEN_NAME } from '@/constants/screen-name';

const MyVoucherScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VoucherTabId>('active');
  const voucherQ = useGetVoucherList(1, 10);

  const activeCount = useMemo(
    () => voucherQ.data?.data?.items?.length ?? ACTIVE_VOUCHER_COUNT,
    [voucherQ.data?.data?.items?.length],
  );

  const handleVoucherPress = useCallback((item: VoucherItem) => {
    navigate(SCREEN_NAME.VOUCHER_DETAIL_SCREEN, { voucher: item });
  }, []);

  const handleActionPress = useCallback((item: VoucherItem) => {
    console.log('[MyVoucher] action press:', item.id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <VoucherList
        activeCount={activeCount}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onVoucherPress={handleVoucherPress}
        onActionPress={handleActionPress}
      />
    </View>
  );
};

export default MyVoucherScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
});
