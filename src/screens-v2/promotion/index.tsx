import { SCREEN_NAME } from '@/constants/screen-name';
import { useGetProfile } from '@/hooks/useProfile';
import { useGetVoucherList } from '@/hooks/useVoucher';
import { navigate } from '@/navigators/navigation-service';
import { callPhoneNumber } from '@/utils';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import CategoryTabs from './components/CategoryTabs';
import PromotionBannerCarousel from './components/PromotionBannerCarousel';
import PromotionHeader from './components/PromotionHeader';
import PromotionList from './components/PromotionList';
import SummaryStats from './components/SummaryStats';
import { PROMOTION_ITEMS } from './data';
import { PromotionCategoryId, PromotionListItemData } from './types';

const PromotionScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<PromotionCategoryId>('all');

  const { data: profile } = useGetProfile();
  const voucherQ = useGetVoucherList(1, 10);

  const voucherCount = voucherQ.data?.data?.items?.length ?? 3;
  const points = profile?.reward_point ?? profile?.loyalty_points ?? 784;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return PROMOTION_ITEMS;
    }
    if (activeCategory === 'crop') {
      return PROMOTION_ITEMS.filter(item => item.category === 'combo');
    }
    return PROMOTION_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleItemPress = useCallback((item: PromotionListItemData) => {
    console.log('[PromotionV2] item press:', item.id);
  }, []);

  const handleVoucherPress = useCallback(() => {
    navigate(SCREEN_NAME.MY_VOUCHER_SCREEN);
  }, []);

  const handlePointsPress = useCallback(() => {
    navigate(SCREEN_NAME.EXCHANGE_GIFTS_SCREEN);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <PromotionHeader onSupportPress={() => callPhoneNumber()} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PromotionBannerCarousel />

        <SummaryStats
          voucherCount={voucherCount}
          points={points}
          onVoucherPress={handleVoucherPress}
          onPointsPress={handlePointsPress}
        />

        <CategoryTabs activeId={activeCategory} onChange={setActiveCategory} />

        <PromotionList items={filteredItems} onItemPress={handleItemPress} />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(24),
  },
  bottomSpacer: {
    height: scale(8),
  },
});
