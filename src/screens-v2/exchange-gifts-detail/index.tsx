import { useGetProfile } from '@/hooks/useProfile';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import BottomActions from './components/BottomActions';
import GiftDetailHeader from './components/GiftDetailHeader';
import PointsSummarySection from './components/PointsSummarySection';
import ProductImageCard from './components/ProductImageCard';
import ProductInfoSection from './components/ProductInfoSection';
import RedemptionMethodSection from './components/RedemptionMethodSection';
import StockStatusSection from './components/StockStatusSection';
import { DEFAULT_GIFT_DETAIL } from './data';
import { RedemptionMethodId } from './types';
import { SCREEN_NAME } from '@/constants/screen-name';
import { navigate } from '@/navigators/navigation-service';
import { callPhoneNumber } from '@/utils';

const ExchangeGiftsDetailScreen: React.FC = () => {
  const gift = DEFAULT_GIFT_DETAIL;
  const { data: profile } = useGetProfile();
  const [selectedMethod, setSelectedMethod] =
    useState<RedemptionMethodId>('store');

  const currentPoints = useMemo(
    () =>
      profile?.reward_point ?? profile?.loyalty_points ?? gift.currentPoints,
    [profile?.reward_point, profile?.loyalty_points, gift.currentPoints],
  );

  const handleSave = useCallback(() => {
    console.log('[GiftDetail] save');
  }, []);

  const handleRedeem = useCallback(() => {
    navigate(SCREEN_NAME.EXCHANGE_GIFTS_SUCCESS_SCREEN);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <GiftDetailHeader onSupportPress={callPhoneNumber} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImageCard inStock={gift.inStock} />

        <ProductInfoSection
          title={gift.title}
          points={gift.points}
          description={gift.description}
          features={gift.features}
        />

        <RedemptionMethodSection
          methods={gift.methods}
          selectedId={selectedMethod}
          onSelect={setSelectedMethod}
        />

        <StockStatusSection
          remaining={gift.stockRemaining}
          total={gift.stockTotal}
          updatedAt={gift.stockUpdatedAt}
        />

        <PointsSummarySection
          currentPoints={currentPoints}
          redeemPoints={gift.points}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomActions onSave={handleSave} onRedeem={handleRedeem} />
    </View>
  );
};

export default ExchangeGiftsDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(8),
  },
  bottomSpacer: {
    height: scale(8),
  },
});
