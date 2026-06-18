import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Bell, Headphones } from 'lucide-react-native';
import React, { memo } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale, width } from 'react-native-utils-scale';

type Props = {
  greeting: string;
  brandName?: string;
  subtitle?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onSupportPress?: () => void;
};

const HomeHeader: React.FC<Props> = ({
  greeting,
  brandName = 'Quang Nông 719',
  subtitle = 'Đồng hành cùng mùa vụ bội thu',
  notificationCount = 0,
  onNotificationPress,
  onSupportPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={Images.bg_home}
        style={styles.banner}
        imageStyle={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={[styles.topRow, { paddingTop: insets.top }]}>
          <View style={styles.brandRow}>
            <View style={styles.logoCircle}>
              <Image
                source={Images.logowhite}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.brandTextWrap}>
              <CText style={styles.greeting}>{greeting}</CText>
              <CText style={styles.brandName}>{brandName}</CText>
              <CText style={styles.subtitle}>{subtitle}</CText>
            </View>
          </View>

          <View style={styles.actions}>
            <HeaderIconButton onPress={onNotificationPress}>
              <Bell color={Colors.h1} size={18} strokeWidth={2.2} />
              {notificationCount > 0 ? (
                <View style={styles.badge}>
                  <CText style={styles.badgeText}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </CText>
                </View>
              ) : null}
            </HeaderIconButton>
            <HeaderIconButton onPress={onSupportPress}>
              <Headphones color={Colors.h1} size={18} strokeWidth={2.2} />
            </HeaderIconButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const HeaderIconButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.iconButton,
      pressed && styles.iconButtonPressed,
    ]}
  >
    {children}
  </Pressable>
);

export default memo(HomeHeader);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
  },
  banner: {
    width,
    minHeight: scale(168),
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(36),
  },
  brandRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
  },
  logoCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  logo: {
    width: scale(28),
    height: scale(28),
  },
  brandTextWrap: {
    flex: 1,
  },
  greeting: {
    fontSize: fontScale(12),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
  },
  brandName: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginTop: scale(2),
  },
  subtitle: {
    fontSize: fontScale(11),
    color: Colors.white,
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(2),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  iconButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.85,
  },
  badge: {
    position: 'absolute',
    top: scale(3),
    right: scale(3),
    minWidth: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(3),
  },
  badgeText: {
    color: Colors.white,
    fontSize: fontScale(9),
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(11),
  },
});
