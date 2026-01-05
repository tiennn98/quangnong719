import CText from '@/components/text';
import { Colors } from '@/themes';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../style.module';

export const NextTaskBlock: React.FC = () => (
  <View style={styles.blockWrapper}>
    <View style={styles.blockHeader}>
      <View style={[styles.blockIconCircle, {backgroundColor: Colors.backgroundInput}]}>
        <CText style={styles.blockIconText}>🍃</CText>
      </View>
      <CText style={styles.blockTitle}>Công việc tiếp theo</CText>
    </View>
    <TouchableOpacity style={styles.nextTaskContent} activeOpacity={0.8}>
      <CText style={styles.taskTitle}>Apply Coffee Fertilizer</CText>
      <View style={styles.taskDetailRow}>
        <CText style={styles.taskDetailText}>Coffee • 2024-11-28 06:00</CText>
        <CText style={styles.taskArrow}>{'>'}</CText>
      </View>
    </TouchableOpacity>
  </View>
);
