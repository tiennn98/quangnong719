import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ChevronRight, Clock3, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { NotificationItem, NotificationStatusTone } from '../types';

type Props = {
  item: NotificationItem;
  onPress?: (item: NotificationItem) => void;
};

const STATUS_COLORS: Record<NotificationStatusTone, string> = {
  new: Colors.greenPrimary,
  important: '#D97706',
  read: Colors.greenPrimary,
};

const LABEL_COLORS = {
  green: Colors.greenPrimary,
  orange: '#D97706',
} as const;

const NotificationCard: React.FC<Props> = ({ item, onPress }) => {
  const statusColor = STATUS_COLORS[item.statusTone];

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [
        styles.card,
        item.highlighted && styles.cardHighlighted,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.thumbnailWrap}>
        <View style={styles.thumbnail} />
        {item.thumbnailBadge === 'clock' ? (
          <View style={styles.thumbnailBadge}>
            <Clock3 color="#D97706" size={10} strokeWidth={2.2} />
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        {item.label ? (
          <View style={styles.labelRow}>
            {item.labelTone === 'green' ? (
              <Star
                color={LABEL_COLORS.green}
                size={10}
                fill={LABEL_COLORS.green}
              />
            ) : null}
            <CText
              style={[
                styles.label,
                {
                  color: item.labelTone
                    ? LABEL_COLORS[item.labelTone]
                    : Colors.gray500,
                },
              ]}
            >
              {item.label}
            </CText>
          </View>
        ) : null}

        <CText
          style={[
            styles.title,
            item.highlighted && styles.titleHighlighted,
          ]}
          numberOfLines={2}
        >
          {item.title}
        </CText>

        <CText style={styles.description} numberOfLines={2}>
          {item.description}
        </CText>

        <View style={styles.footer}>
          <Clock3 color={Colors.gray500} size={11} strokeWidth={2.2} />
          <CText style={styles.metaText}>{item.time}</CText>
          <CText style={styles.dot}>•</CText>
          <CText style={styles.metaText}>{item.date}</CText>
          <View style={styles.statusWrap}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <CText style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </CText>
          </View>
        </View>
      </View>

      <View style={styles.actionWrap}>
        <ChevronRight color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
      </View>
    </Pressable>
  );
};

export default memo(NotificationCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(10),
    marginBottom: scale(10),
    gap: scale(10),
  },
  cardHighlighted: {
    borderColor: Colors.greenPrimary,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.92,
  },
  thumbnailWrap: {
    position: 'relative',
    flexShrink: 0,
  },
  thumbnail: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(12),
    backgroundColor: 'red',
  },
  thumbnailBadge: {
    position: 'absolute',
    top: scale(4),
    left: scale(4),
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginBottom: scale(4),
  },
  label: {
    fontSize: fontScale(9),
    fontFamily: Fonts.BOLD,
  },
  title: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(16),
  },
  titleHighlighted: {
    color: Colors.h1,
  },
  description: {
    marginTop: scale(4),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: scale(4),
    marginTop: scale(8),
  },
  metaText: {
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  dot: {
    fontSize: fontScale(9),
    color: Colors.gray300,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginLeft: scale(2),
  },
  statusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },
  statusText: {
    fontSize: fontScale(9),
    fontFamily: Fonts.SEMIBOLD,
  },
  actionWrap: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
