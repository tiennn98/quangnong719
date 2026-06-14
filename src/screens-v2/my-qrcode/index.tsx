import { useGetProfile } from '@/hooks/useProfile';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import { DEFAULT_QR_PROFILE } from './data';
import MyQrcodeHeader from './components/MyQrcodeHeader';
import ProfileCard from './components/ProfileCard';
import QrActionButtons from './components/QrActionButtons';
import QrCodeCard from './components/QrCodeCard';
import UsageInfoList from './components/UsageInfoList';
import { QrProfileData, UsageInfoItemData } from './types';

const MyQrcodeScreen: React.FC = () => {
  const { data: profile } = useGetProfile();

  const qrProfile: QrProfileData = useMemo(() => {
    const phone = profile?.phone_number?.trim() || DEFAULT_QR_PROFILE.phone;
    const customerCode =
      profile?.kiotviet_customer_code?.trim() ||
      phone ||
      DEFAULT_QR_PROFILE.customerCode;
    const userCode = customerCode || DEFAULT_QR_PROFILE.userCode;

    return {
      fullName: profile?.full_name?.trim() || DEFAULT_QR_PROFILE.fullName,
      phone,
      customerCode,
      memberLabel: DEFAULT_QR_PROFILE.memberLabel,
      points:
        profile?.reward_point ??
        profile?.loyalty_points ??
        DEFAULT_QR_PROFILE.points,
      qrValue: userCode,
      userCode,
    };
  }, [profile]);

  const handleEditAvatar = useCallback(() => {
    console.log('[MyQrcode] edit avatar');
  }, []);

  const handleSave = useCallback(() => {
    console.log('[MyQrcode] save qr');
  }, []);

  const handleShare = useCallback(() => {
    console.log('[MyQrcode] share qr');
  }, []);

  const handleUsagePress = useCallback((item: UsageInfoItemData) => {
    console.log('[MyQrcode] usage press:', item.id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <MyQrcodeHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileCard profile={qrProfile} onEditAvatar={handleEditAvatar} />

        <QrCodeCard
          qrValue={qrProfile.qrValue}
          userCode={qrProfile.userCode}
        />

        <QrActionButtons onSave={handleSave} onShare={handleShare} />

        <UsageInfoList onItemPress={handleUsagePress} />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default MyQrcodeScreen;

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
