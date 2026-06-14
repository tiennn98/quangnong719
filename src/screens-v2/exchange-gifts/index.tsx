import { useGetProfile } from '@/hooks/useProfile';
import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import GiftGrid from './components/GiftGrid';
import { DEFAULT_POINTS } from './data';
import { GiftCategoryId, GiftItem, RedemptionHistoryItem } from './types';
import { navigate } from '@/navigators/navigation-service';
import { SCREEN_NAME } from '@/constants/screen-name';

const ExchangeGiftsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GiftCategoryId>('all');
  const { data: profile } = useGetProfile();

  const points = useMemo(
    () =>
      profile?.reward_point ?? profile?.loyalty_points ?? DEFAULT_POINTS,
    [profile?.reward_point, profile?.loyalty_points],
  );

  const handleSupportPress = useCallback(() => {
    console.log('[ExchangeGifts] support');
  }, []);

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
        onSupportPress={handleSupportPress}
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
