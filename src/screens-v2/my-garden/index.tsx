import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import BottomActions from './components/BottomActions';
import GardenList from './components/GardenList';
import { GardenItem } from './types';

const MyGardenScreen: React.FC = () => {
  const handleGardenPress = useCallback((garden: GardenItem) => {
    console.log('[MyGarden] garden press:', garden.id);
  }, []);

  const handleSortPress = useCallback(() => {
    console.log('[MyGarden] sort press');
  }, []);

  const handleAddGarden = useCallback(() => {
    console.log('[MyGarden] add garden');
  }, []);

  const handleSchedule = useCallback(() => {
    console.log('[MyGarden] schedule');
  }, []);

  const handleReport = useCallback(() => {
    console.log('[MyGarden] report');
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <GardenList
        onGardenPress={handleGardenPress}
        onSortPress={handleSortPress}
      />

      <BottomActions
        onAddGarden={handleAddGarden}
        onSchedule={handleSchedule}
        onReport={handleReport}
      />
    </View>
  );
};

export default MyGardenScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
});
