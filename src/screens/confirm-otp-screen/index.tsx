import {Images} from '@/assets';
import {CHeader, CText, InputOTP} from '@/components';
import CButton from '@/components/button';
import {Colors, Fonts} from '@/themes';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {scale, width} from 'react-native-utils-scale';

const ConfirmOtpScreen = () => {
  return (
    <View style={styles.container}>
      <CHeader back />
      <View style={styles.contentContainer}>
        <View style={styles.viewImage}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={styles.imageLogo}
          />
        </View>
        <View style={styles.gap}>
          <CText
            color={Colors.white}
            fontSize={26}
            fontFamily={Fonts.BOLD}
            align="center">
            {'XÁC THỰC SỐ ĐIỆN THOẠI'}
          </CText>
          <CText color={Colors.white} align="center">
            {'Mã OTP đã được gửi đến 0888888888'}
          </CText>
        </View>
        <InputOTP onChangeValue={() => {}} />
        <CText color={Colors.white} align="center">
          {'Chưa nhận được mã OTP? '}
          <CText
            color={Colors.white}
            style={styles.underline}
            onPress={() => {}}>
            Gửi lại
          </CText>
        </CText>
        <View style={styles.viewButton}>
          <CButton title="Xác thực" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: scale(20),
  },
  viewImage: {
    alignItems: 'center',
    marginTop: scale(20),
  },
  imageLogo: {
    width: width / 2.5,
    height: width / 2.5,
  },
  viewButton: {
    paddingHorizontal: scale(50),
  },
  gap: {
    gap: scale(8),
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default ConfirmOtpScreen;
