import React, { useCallback } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import BottomActions from './components/BottomActions';
import ConditionsSection from './components/ConditionsSection';
import EventBannerCard from './components/EventBannerCard';
import EventDetailHeader from './components/EventDetailHeader';
import EventInfoCard from './components/EventInfoCard';
import EventIntroSection from './components/EventIntroSection';
import MainContentSection from './components/MainContentSection';
import ParticipationGiftsSection from './components/ParticipationGiftsSection';
import SpeakersSection from './components/SpeakersSection';
import { DEFAULT_EVENT_DETAIL } from './data';

const EventDetailScreen: React.FC = () => {
  const event = DEFAULT_EVENT_DETAIL;

  const handleShare = useCallback(() => {
    console.log('[EventDetail] share');
  }, []);

  const handleDirections = useCallback(() => {
    console.log('[EventDetail] directions');
  }, []);

  const handleSave = useCallback(() => {
    console.log('[EventDetail] save');
  }, []);

  const handleRegister = useCallback(() => {
    console.log('[EventDetail] register');
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <EventDetailHeader onSharePress={handleShare} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <EventBannerCard
          title={event.title}
          subtitle={event.subtitle}
          status={event.status}
          date={event.date}
          time={event.time}
          location={event.location}
        />

        <EventIntroSection intro={event.intro} features={event.features} />

        <EventInfoCard
          startTime={event.startTime}
          fullLocation={event.fullLocation}
          seatsRemaining={event.seatsRemaining}
          seatsTotal={event.seatsTotal}
          giftsSummary={event.giftsSummary}
          onDirectionsPress={handleDirections}
        />

        <MainContentSection items={event.mainContent} />

        <SpeakersSection speakers={event.speakers} />

        <ParticipationGiftsSection description={event.participationGifts} />

        <ConditionsSection description={event.conditions} />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomActions onSave={handleSave} onRegister={handleRegister} />
    </View>
  );
};

export default EventDetailScreen;

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
