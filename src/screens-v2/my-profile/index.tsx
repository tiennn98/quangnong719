import { SCREEN_NAME } from '@/constants';
import { useGetProfile } from '@/hooks/useProfile';
import { navigate } from '@/navigators';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import FeaturedInfoSection from './components/FeaturedInfoSection';
import MyGardensSection from './components/MyGardensSection';
import OverviewSection from './components/OverviewSection';
import ProfileHeader from './components/ProfileHeader';
import ProfileHeroCard from './components/ProfileHeroCard';
import QuickNavGrid from './components/QuickNavGrid';
import QuickTasksSection from './components/QuickTasksSection';
import { DEFAULT_PROFILE } from './data';
import {
  FeaturedInfoItem,
  ProfileGardenItem,
  QuickNavId,
  QuickTaskId,
} from './types';

const MyProfileScreen: React.FC = () => {
  const { data: profile } = useGetProfile();

  const profileData = useMemo(() => {
    const fullName = profile?.full_name?.trim() || DEFAULT_PROFILE.fullName;
    const phone = profile?.phone_number?.trim() || DEFAULT_PROFILE.phone;
    const customerCode =
      profile?.kiotviet_customer_code?.trim() ||
      phone ||
      DEFAULT_PROFILE.customerCode;

    const address =
      [
        profile?.address?.trim(),
        profile?.ward_name?.trim(),
        profile?.location_name?.trim(),
      ]
        .filter(Boolean)
        .join(', ') || DEFAULT_PROFILE.featuredInfo[1].value;

    const featuredInfo: FeaturedInfoItem[] = DEFAULT_PROFILE.featuredInfo.map(
      item => {
        if (item.id === 'name') {
          return { ...item, value: fullName };
        }
        if (item.id === 'address') {
          return { ...item, value: address };
        }
        return item;
      },
    );

    return {
      fullName,
      phone,
      customerCode,
      memberLabel: DEFAULT_PROFILE.memberLabel,
      points:
        profile?.reward_point ??
        profile?.loyalty_points ??
        DEFAULT_PROFILE.points,
      currentDebt: DEFAULT_PROFILE.currentDebt,
      overview: DEFAULT_PROFILE.overview,
      featuredInfo,
      gardens: DEFAULT_PROFILE.gardens,
    };
  }, [profile]);

  const handleSettingsPress = useCallback(() => {
    console.log('[MyProfile] settings');
  }, []);

  const handleEditPress = useCallback(() => {
    console.log('[MyProfile] edit avatar');
  }, []);

  const handleQuickNavPress = useCallback((id: QuickNavId) => {
    switch (id) {
      case 'qr':
        navigate(SCREEN_NAME.MY_QRCODE_SCREEN);
        break;
      case 'garden':
        navigate(SCREEN_NAME.MY_GARDEN);
        break;
      case 'debt':
        navigate(SCREEN_NAME.INVOICESCREEN);
        break;
      case 'points':
        navigate(SCREEN_NAME.EXCHANGE_GIFTS_SCREEN);
        break;
      default:
        break;
    }
  }, []);

  const handleFeaturedPress = useCallback((item: FeaturedInfoItem) => {
    console.log('[MyProfile] featured:', item.id);
  }, []);

  const handleQuickTaskPress = useCallback((id: QuickTaskId) => {
    switch (id) {
      case 'edit':
        navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN);
        break;
      case 'history':
        navigate(SCREEN_NAME.INVOICESCREEN);
        break;
      case 'notification':
        navigate(SCREEN_NAME.NOTIFICATION_SCREEN);
        break;
      default:
        break;
    }
  }, []);

  const handleSeeAllGardens = useCallback(() => {
    navigate(SCREEN_NAME.MY_GARDEN);
  }, []);

  const handleGardenPress = useCallback((_garden: ProfileGardenItem) => {
    navigate(SCREEN_NAME.MY_GARDEN);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <ProfileHeader onSettingsPress={handleSettingsPress} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeroCard
          fullName={profileData.fullName}
          phone={profileData.phone}
          customerCode={profileData.customerCode}
          memberLabel={profileData.memberLabel}
          points={profileData.points}
          currentDebt={profileData.currentDebt}
          onEditPress={handleEditPress}
        />

        <QuickNavGrid onPress={handleQuickNavPress} />

        <OverviewSection items={profileData.overview} />

        <FeaturedInfoSection
          items={profileData.featuredInfo}
          onItemPress={handleFeaturedPress}
        />

        <QuickTasksSection onPress={handleQuickTaskPress} />

        <MyGardensSection
          gardens={profileData.gardens}
          onSeeAll={handleSeeAllGardens}
          onGardenPress={handleGardenPress}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default MyProfileScreen;

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
