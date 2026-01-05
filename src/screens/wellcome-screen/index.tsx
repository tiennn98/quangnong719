import React, { useCallback } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Images } from '@/assets';
import CText from '@/components/text';
import { SCREEN_NAME } from '@/constants';
import { navigate } from '@/navigators';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale } from 'react-native-utils-scale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './styles.module';
import { Colors } from '@/themes';
interface ListItemProps {
  text: string;
}
const TERMS_URL = 'https://quangnong719.vn/terms';
const PRIVACY_URL = 'https://quangnong719.vn/privacy';

const ListItem: React.FC<ListItemProps> = ({text}) => (
  <View style={styles.listItemContainer}>
    <View style={styles.bulletPoint} />
    <CText style={styles.listItemText}>{text}</CText>
  </View>
);
  const termsFontSize = fontScale(16);
  const termsLineHeight = fontScale(22);
const WellComeScreen = () => {
  const insets = useSafeAreaInsets();
   const openUrl = useCallback(async (url: string) => {
      try {
        const ok = await Linking.canOpenURL(url);
        if (!ok) {
          Alert.alert('Thông báo', 'Không thể mở liên kết này.');
          return;
        }
        await Linking.openURL(url);
      } catch {
        Alert.alert('Thông báo', 'Không thể mở liên kết. Vui lòng thử lại.');
      }
    }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={Images.wellcome}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}>
          <LinearGradient
            colors={[
              'rgba(34, 139, 34, 0.95)',
              'rgba(0, 100, 0, 0.3)',
              'rgba(34, 139, 34, 0.95)',
            ]}
            style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View
              style={[
                styles.safeAreaContent,
                {paddingTop: insets.top},
              ]}>
              <View style={styles.headerContainer}>
                <View style={styles.logoBox}>
                  <Image source={Images.logowhite} style={styles.logoIcon} />
                </View>

                <CText style={styles.appName}>Quang Nông 719</CText>
                <CText style={styles.tagline1}>
                  Nông dân cần - có Quang Nông
                </CText>
                <CText style={styles.tagline2}>
                  Cùng Phát triển, Cùng Thành công
                </CText>
              </View>

              <View style={styles.featuresBox}>
                <ListItem text="Theo dõi mua hàng và công nợ" />
                <ListItem text="Quản lý lịch canh tác" />
                <ListItem text="Nhận voucher và phần thưởng độc quyền" />
                <ListItem text="Tham gia sự kiện và hội thảo" />
              </View>

              <TouchableOpacity
                style={styles.startButton}
                activeOpacity={0.8}
                onPress={() => navigate(SCREEN_NAME.LOGIN)}>
                <CText style={styles.startButtonText}>Bắt đầu ngay</CText>

                <AntDesign
                  name="arrowright"
                  size={fontScale(18)}
                  color={'#228B22'}
                />
              </TouchableOpacity>

              <View>
                      <TouchableOpacity
                        style={styles.rowAgree}
                        activeOpacity={0.8}
                        onPress={() => {}}>
                        <CText
                          color={Colors.h2}
                          style={[
                            styles.termsText,
                            {
                              flex: 1,
                              fontSize: termsFontSize,
                              lineHeight: termsLineHeight,
                              ...(Platform.OS === 'android' ? {includeFontPadding: false} : null),
                            },
                          ]}>
                          Bằng cách tiếp tục, bạn đồng ý với{' '}
                          <CText
                            style={[
                              styles.linkText,
                              {
                                fontSize: termsFontSize,
                                lineHeight: termsLineHeight,
                                ...(Platform.OS === 'android' ? {includeFontPadding: false} : null),
                              },
                            ]}
                            onPress={() => openUrl(TERMS_URL)}>
                            Điều khoản dịch vụ
                          </CText>
                          {' '}và{' '}
                          <CText
                            style={[
                              styles.linkText,
                              {
                                fontSize: termsFontSize,
                                lineHeight: termsLineHeight,
                                ...(Platform.OS === 'android' ? {includeFontPadding: false} : null),
                              },
                            ]}
                            onPress={() => openUrl(PRIVACY_URL)}>
                            Chính sách bảo mật
                          </CText>
                          {' '}của chúng tôi
                        </CText>
                      </TouchableOpacity>
                    </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WellComeScreen;
