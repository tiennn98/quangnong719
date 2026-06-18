import { SCREEN_NAME } from '@/constants/screen-name';
import { useGetProfile } from '@/hooks/useProfile';
import { navigate } from '@/navigators/navigation-service';
import { callPhoneNumber } from '@/utils';
import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import GiftGrid from './components/GiftGrid';
import { DEFAULT_POINTS } from './data';
import { GiftCategoryId, GiftItem, RedemptionHistoryItem } from './types';

const ExchangeGiftsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GiftCategoryId>('all');
  const { data: profile } = useGetProfile();

  const points = useMemo(
    () => profile?.reward_point ?? profile?.loyalty_points ?? DEFAULT_POINTS,
    [profile?.reward_point, profile?.loyalty_points],
  );

  const handleRedeem = useCallback((_item: GiftItem) => {
    navigate(SCREEN_NAME.EXCHANGE_GIFTS_DETAIL_SCREEN);
  }, []);

  const handleSeeAllHistory = useCallback(() => {
    console.log('[ExchangeGifts] see all history');
  }, []);

  const handleHistoryPress = useCallback((item: RedemptionHistoryItem) => {
    console.log('[ExchangeGifts] history press:', item.id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <GiftGrid
        points={points}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSupportPress={callPhoneNumber}
        onRedeem={handleRedeem}
        onSeeAllHistory={handleSeeAllHistory}
        onHistoryPress={handleHistoryPress}
      />
    </View>
  );
};

export default ExchangeGiftsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
});
