// src/screens/ProfileScreen.tsx

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ActionButtons from './components/ActionButtons';

const DUMMY_DATA = {
  customer: {
    name: 'Nguyen Van Minh',
    phone: '84 912 345 678',
    rank: 'Gold',
    customerId: 'FARM-001-2024',
    address: '123 Rural Road, Dak Lak Province',
    crops: ['Coffee', 'Pepper', 'Durian'],
    avatarUri: 'https://i.imgur.com/example-farmer.jpg',
  },
  progress: {
    currentRank: 'Gold',
    nextRank: 'Platinum',
    currentValue: 125.0,
    remainingValue: 25.0,
    totalValueForNextRank: 150.0, // 125.0 + 25.0
  },
};

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <CustomerInfoCard
          name={DUMMY_DATA.customer.name}
          phone={DUMMY_DATA.customer.phone}
          rank={DUMMY_DATA.customer.rank}
          customerId={DUMMY_DATA.customer.customerId}
          address={DUMMY_DATA.customer.address}
          crops={DUMMY_DATA.customer.crops}
          avatarUri={DUMMY_DATA.customer.avatarUri}
        />

        <RankProgressCard
          currentRank={DUMMY_DATA.progress.currentRank}
          nextRank={DUMMY_DATA.progress.nextRank}
          currentValue={DUMMY_DATA.progress.currentValue}
          remainingValue={DUMMY_DATA.progress.remainingValue}
          totalValueForNextRank={DUMMY_DATA.progress.totalValueForNextRank}
        /> */}

        <ActionButtons />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
  },
});

export default ProfileScreen;
