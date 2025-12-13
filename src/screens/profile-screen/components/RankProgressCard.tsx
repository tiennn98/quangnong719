// src/components/RankProgressCard.tsx

import CText from '@/components/text';
import { Colors } from '@/themes';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface RankProgressCardProps {
  currentRank: string;
  nextRank: string;
  currentValue: number; // Ví dụ: 125.0 (triệu VND)
  remainingValue: number; // Ví dụ: 25.0 (triệu VND)
  totalValueForNextRank: number; // Ví dụ: 150.0 (triệu VND)
}

const RankProgressCard: React.FC<RankProgressCardProps> = ({
  currentRank,
  nextRank,
  currentValue,
  remainingValue,
  totalValueForNextRank,
}) => {
  const percentage = (currentValue / totalValueForNextRank) * 100;
  const currentText = `${currentValue.toFixed(1)}M VND`;
  const remainingText = `${remainingValue.toFixed(1)}M nữa`;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons name="ribbon" size={24} color={Colors.yellow} />
        <CText style={styles.title}>Tiến độ Hạng</CText>
      </View>

      <View style={styles.rankInfo}>
        <View>
          <CText style={styles.label}>Hạng hiện tại</CText>
          <CText style={styles.currentRank}>{currentRank}</CText>
        </View>
        <View style={styles.nextRankContainer}>
          <CText style={styles.label}>Hạng tiếp theo</CText>
          <CText style={styles.nextRank}>{nextRank}</CText>
          <MaterialCommunityIcons name="weather-sunny" size={20} color={Colors.yellow} style={styles.sparkle} />
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        <View style={styles.progressBarBackground} />
      </View>

      <View style={styles.progressValue}>
        <CText style={styles.currentValueText}>{currentText}</CText>
        <CText style={styles.remainingValueText}>{remainingText}</CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.h1,
  },
  rankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: Colors.buttonbg,
  },
  currentRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.h2,
  },
  nextRankContainer: {
    alignItems: 'flex-end',
  },
  nextRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.h2,
  },
  sparkle: {
    position: 'absolute',
    right: -25, // Di chuyển biểu tượng ra ngoài
    bottom: 0,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: Colors.black, // Màu nền nhạt
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.h2, // Thay thế cho Colors.platinum
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.red,
    borderRadius: 5,
  },
  progressValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.h1,
  },
  remainingValueText: {
    fontSize: 14,
    color: Colors.buttonbg,
  },
});

export default RankProgressCard;
