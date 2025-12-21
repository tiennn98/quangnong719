import { useGetProfile } from '@/hooks/useProfile';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ActionButtons from './components/ActionButtons';
import CustomerInfoCard from './components/CustomerInfoCard';

const ProfileScreen: React.FC = () => {
  const {data:profile} =   useGetProfile();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
      >
        <CustomerInfoCard
          rank="Gold"
          crops={profile?.type_of_plants || []}
          avatarUri={'https://quangnong.vn/' + (profile?.avatar || '')}
        />

        {/* <RankProgressCard
          currentRank="Gold"
          nextRank="Platinum"
          currentValue={125}
          remainingValue={25}
          totalValueForNextRank={150}
        /> */}

        <ActionButtons />

        {/* ✅ Spacer: ép content dài hơn màn hình để chắc chắn có scroll */}
        {/* <View style={{ height: 250 }} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: { flex: 1 },
  content: {
    paddingVertical: 16,
    paddingBottom: 100,


  },
});

export default ProfileScreen;
