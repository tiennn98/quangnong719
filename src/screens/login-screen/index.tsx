import {Images} from '@/assets';
import {CText, InputOTP} from '@/components';
import {Colors, Fonts} from '@/themes';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {scale, width} from 'react-native-utils-scale';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.viewImage}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={styles.imageLogo}
          />
        </View>
        <View>
          <CText color={Colors.white}>
            {'Xin chào! Chào mừng bà con đến với'}
          </CText>
          <CText color={Colors.white} fontSize={30} fontFamily={Fonts.BOLD}>
            {'Quang Nông 719'}
          </CText>
        </View>
        <View>
          <CText color={Colors.white}>{'Nhập số điện thoại'}</CText>
          <InputOTP valueText={123456} onChangeValue={() => {}} />
        </View>
      </View>
    </SafeAreaView>
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
});

export default LoginScreen;
