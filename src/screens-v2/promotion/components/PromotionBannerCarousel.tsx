import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ArrowRight, CloudRain } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';

type Props = {
  onPress?: () => void;
};

const PromotionBannerCarousel: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={Images.bannner}
        style={styles.banner}
        imageStyle={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.tag}>
              <CloudRain color={Colors.white} size={12} />
              <CText style={styles.tagText}>MÙA MƯA BỘI THU</CText>
            </View>

            <CText style={styles.title}>Ưu đãi mùa mưa{'\n'}vụ bội thu</CText>
            <CText style={styles.subtitle}>
              Giải pháp đồng hành – Vụ mùa bội thu
            </CText>

            <Pressable
              onPress={onPress}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.ctaButtonPressed,
              ]}
            >
              <CText style={styles.ctaText}>Xem ngay</CText>
              <ArrowRight color={Colors.h1} size={16} />
            </Pressable>
          </View>

          <Image source={Images.thung} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default memo(PromotionBannerCarousel);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(16),
  },
  banner: {
    width: '100%',
    minHeight: scale(168),
    borderRadius: scale(16),
    overflow: 'hidden',
    backgroundColor: '#DDF3E4',
  },
  bannerImage: {
    borderRadius: scale(16),
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingTop: scale(14),
    paddingBottom: scale(24),
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  content: {
    flex: 1,
    paddingRight: scale(8),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: scale(4),
    backgroundColor: Colors.h1,
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  tagText: {
    fontSize: fontScale(9),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  title: {
    marginTop: scale(10),
    fontSize: fontScale(18),
    lineHeight: fontScale(24),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  subtitle: {
    marginTop: scale(4),
    fontSize: fontScale(11),
    color: Colors.h2,
    fontFamily: Fonts.MEDIUM,
  },
  ctaButton: {
    marginTop: scale(12),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    backgroundColor: Colors.yellow,
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },
  ctaButtonPressed: {
    opacity: 0.9,
  },
  ctaText: {
    fontSize: fontScale(12),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  productImage: {
    width: scale(width * 0.28),
    height: scale(110),
  },
  dots: {
    position: 'absolute',
    bottom: scale(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(6),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: 'rgba(25,103,58,0.25)',
  },
  dotActive: {
    width: scale(16),
    backgroundColor: Colors.greenPrimary,
  },
});
