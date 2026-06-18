import { useGetProfile } from '@/hooks/useProfile';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import BottomActions from './components/BottomActions';
import NextStepsSection from './components/NextStepsSection';
import RedeemedItemCard from './components/RedeemedItemCard';
import RemainingPointsCard from './components/RemainingPointsCard';
import SuccessHeader from './components/SuccessHeader';
import SuccessHero from './components/SuccessHero';
import { DEFAULT_SUCCESS_DATA } from './data';
import { callPhoneNumber } from '@/utils';

const ExchangeGiftsSuccessScreen: React.FC = () => {
  const success = DEFAULT_SUCCESS_DATA;
  const { data: profile } = useGetProfile();

  const remainingPoints = useMemo(() => {
    const current =
      profile?.reward_point ??
      profile?.loyalty_points ??
      success.remainingPoints + success.giftPoints;
    return Math.max(0, current - success.giftPoints);
  }, [
    profile?.reward_point,
    profile?.loyalty_points,
    success.giftPoints,
    success.remainingPoints,
  ]);

  const handleViewHistory = useCallback(() => {
    console.log('[GiftSuccess] view history');
  }, []);

  const handleContinue = useCallback(() => {
    console.log('[GiftSuccess] continue');
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <SuccessHeader onSupportPress={callPhoneNumber} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SuccessHero />

        <RedeemedItemCard
          title={success.giftTitle}
          points={success.giftPoints}
          description={success.giftDescription}
        />

        <NextStepsSection steps={success.nextSteps} />

        <RemainingPointsCard points={remainingPoints} />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomActions
        onViewHistory={handleViewHistory}
        onContinue={handleContinue}
      />
    </View>
  );
};

export default ExchangeGiftsSuccessScreen;

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
