import React from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Images} from '@/assets';
import CText from '@/components/text';
import {SCREEN_NAME} from '@/constants';
import {navigate} from '@/navigators';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontScale} from 'react-native-utils-scale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles.module';
interface ListItemProps {
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({text}) => (
  <View style={styles.listItemContainer}>
    <View style={styles.bulletPoint} />
    <CText style={styles.listItemText}>{text}</CText>
  </View>
);

const WellComeScreen = () => {
  const insets = useSafeAreaInsets();
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
                {paddingTop: insets.top, paddingBottom: insets.bottom},
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

              <CText style={styles.termsText}>
                Tiếp tục là bạn đồng ý với{' '}
                <CText style={styles.linkText}>
                  Điều khoản và Chính sách bảo mật
                </CText>
              </CText>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WellComeScreen;
