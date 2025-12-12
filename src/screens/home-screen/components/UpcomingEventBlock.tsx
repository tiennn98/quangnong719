import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../style.module';
import { Colors } from '@/themes';



interface UpcomingEventBlockProps {
  blockTitle?: string;
  blockIcon?: string;
  iconBackgroundColor?: string;
  eventTitle: string;
  eventTime: string;
  onViewAllPress?: () => void;
  onEventPress?: () => void;
  hideViewAllButton?: boolean;
}


const UpcomingEventBlock: React.FC<UpcomingEventBlockProps> = ({
  blockTitle = 'Sự kiện sắp tới',
  blockIcon = '',
  iconBackgroundColor = Colors.iconBg,
  eventTitle,
  eventTime,
  onViewAllPress,
  onEventPress,
  hideViewAllButton = false,
}) => (
  <View style={styles.blockWrapper}>
    <View style={styles.blockHeader}>
      <View style={[styles.blockIconCircle, {backgroundColor: iconBackgroundColor}]}>
        <Text style={styles.blockIconText}>{blockIcon}</Text>
      </View>
      <Text style={styles.blockTitle}>{blockTitle}</Text>
    </View>
    <View style={styles.eventContent}>
      <TouchableOpacity
        style={styles.eventDetails}
        activeOpacity={0.8}
        onPress={onEventPress}
        disabled={!onEventPress}
      >
        <Text style={styles.eventTitle} numberOfLines={2}>
          {eventTitle}
        </Text>
        <Text style={styles.eventTime}>
          {eventTime}
        </Text>
      </TouchableOpacity>

      {!hideViewAllButton && (
        <TouchableOpacity
          style={styles.eventViewAllButton}
          activeOpacity={0.8}
          onPress={onViewAllPress}
        >
          <Text style={styles.eventViewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default UpcomingEventBlock;
