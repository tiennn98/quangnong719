import {useGetProfile} from '@/hooks/useProfile';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-utils-scale';
import ActionButtons from './components/ActionButtons';
import CustomerInfoCard from './components/CustomerInfoCard';

const ProfileScreen: React.FC = () => {
  const {data: profile} = useGetProfile();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.safeArea,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always">
        <CustomerInfoCard
          rank="Member"
          crops={profile?.type_of_plants_ids || []}
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
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F5F5F5'},
  scroll: {flex: 1, paddingTop: scale(16)},
  content: {
    paddingBottom: 100,
  },
});
